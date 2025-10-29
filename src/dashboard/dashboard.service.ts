import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Exit } from '../exits/entities/exit.entity';
import { UserStatus } from '../enum/userstatus';
import { ExitStatus } from '../enum/entry_exit_status';
import { UserRole } from '../enum/userrole';
import { DashboardStatsDto, RecentActivityDto, DashboardDataDto, ChartDataDto, ExitsTrendsDto, ReportsDto, ExitsByReasonDto } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Exit)
    private readonly exitRepository: Repository<Exit>,
  ) {}

  async getDashboardData(): Promise<DashboardDataDto> {
    // Get all students (users with role STUDENT)
    const students = await this.userRepository.find({
      where: { role: UserRole.STUDENT },
      relations: ['exits'],
    });

    // Get all exits with student relations
    const exits = await this.exitRepository.find({
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });

    // Calculate statistics
    const stats = this.calculateStats(students, exits);

    // Generate recent activity
    const recentActivity = this.generateRecentActivity(exits, students);

    // Get the last 5 exits
    const recentExits = exits.slice(0, 5);

    return {
      stats,
      recentActivity,
      recentExits,
    };
  }

  private calculateStats(students: User[], exits: Exit[]): DashboardStatsDto {
    // Student statistics
    const totalStudents = students.length;
    const studentsPresent = students.filter(s => s.status === UserStatus.PRESENT).length;
    const studentsOnExit = students.filter(s => s.status === UserStatus.SORTIE).length;

    // Exit statistics
    const totalExits = exits.length;
    const exitsInProgress = exits.filter(e => e.status === ExitStatus.EN_COURS).length;
    const exitsCompleted = exits.filter(e => e.status === ExitStatus.TERMINEE).length;
    const exitsLate = exits.filter(e => e.status === ExitStatus.EN_RETARD).length;

    // Calculer le taux d'occupation
    const occupancyRate = totalStudents > 0 ? Math.round((studentsPresent / totalStudents) * 100) : 0;

    // Calculate pending issues
    const pendingIssues = exitsLate + exits.filter(e => e.status === ExitStatus.EN_COURS).length;

    return {
      totalStudents,
      studentsPresent,
      studentsOnExit,
      totalExits,
      exitsInProgress,
      exitsCompleted,
      exitsLate,
      occupancyRate,
      pendingIssues,
    };
  }

  private generateRecentActivity(exits: Exit[], students: User[]): RecentActivityDto[] {
    const activities: RecentActivityDto[] = [];

    // Activities based on recent exits (last 5)
    exits.slice(0, 5).forEach(exit => {
      if (exit.status === ExitStatus.EN_COURS) {
        activities.push({
          type: 'exit',
          message: `${exit.student?.firstName} ${exit.student?.lastName} is on exit`,
          color: 'blue',
          timestamp: exit.createdAt?.toISOString() || new Date(exit.departureDate).toISOString(),
        });
      } else if (exit.status === ExitStatus.TERMINEE) {
        activities.push({
          type: 'return',
          message: `${exit.student?.firstName} ${exit.student?.lastName} returned from exit`,
          color: 'green',
          timestamp: exit.actualReturnDate ? new Date(exit.actualReturnDate).toISOString() : exit.updatedAt?.toISOString() || exit.createdAt?.toISOString(),
        });
      } else if (exit.status === ExitStatus.EN_RETARD) {
        activities.push({
          type: 'late',
          message: `${exit.student?.firstName} ${exit.student?.lastName} is late`,
          color: 'orange',
          timestamp: exit.actualReturnDate ? new Date(exit.actualReturnDate).toISOString() : exit.updatedAt?.toISOString() || exit.createdAt?.toISOString(),
        });
      }
    });

    // Add activities based on new students (last week)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newStudents = students
      .filter(s => s.createdAt && new Date(s.createdAt) > oneWeekAgo)
      .slice(0, 2);

    newStudents.forEach(student => {
      activities.push({
        type: 'new',
        message: `New student registered: ${student.firstName} ${student.lastName}`,
        color: 'green',
        timestamp: student.createdAt?.toISOString() || new Date().toISOString(),
      });
    });

    // Sort by timestamp and return the 5 most recent
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  }

  async getExitsTrends(): Promise<ExitsTrendsDto> {
    // Get all exits
    const exits = await this.exitRepository.find({
      order: { createdAt: 'ASC' },
    });

    // Calculate monthly trends (last 12 months)
    const monthly = this.calculateMonthlyTrends(exits);

    // Calculate weekly trends (last 8 weeks)
    const weekly = this.calculateWeeklyTrends(exits);

    // Calculate yearly trends (last 4 years)
    const yearly = this.calculateYearlyTrends(exits);

    return {
      monthly,
      weekly,
      yearly,
    };
  }

  private calculateMonthlyTrends(exits: Exit[]): ChartDataDto[] {
    const monthlyData: { [key: string]: number } = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize all months to 0
    monthNames.forEach(month => {
      monthlyData[month] = 0;
    });

    // Count exits by month
    exits.forEach(exit => {
      const date = new Date(exit.createdAt || exit.departureDate);
      const monthIndex = date.getMonth();
      const monthName = monthNames[monthIndex];
      monthlyData[monthName]++;
    });

    return monthNames.map(month => ({
      name: month,
      sorties: monthlyData[month],
    }));
  }

  private calculateWeeklyTrends(exits: Exit[]): ChartDataDto[] {
    const weeklyData: ChartDataDto[] = [];
    
    // Calculate last 8 weeks
    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const weekExits = exits.filter(exit => {
        const exitDate = new Date(exit.createdAt || exit.departureDate);
        return exitDate >= weekStart && exitDate <= weekEnd;
      });

      weeklyData.push({
        name: `Week ${8 - i}`,
        sorties: weekExits.length,
      });
    }

    return weeklyData;
  }

  private calculateYearlyTrends(exits: Exit[]): ChartDataDto[] {
    const yearlyData: { [key: string]: number } = {};
    
    // Count exits by year
    exits.forEach(exit => {
      const date = new Date(exit.createdAt || exit.departureDate);
      const year = date.getFullYear().toString();
      yearlyData[year] = (yearlyData[year] || 0) + 1;
    });

    // Convert to array and sort by year
    return Object.entries(yearlyData)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([year, count]) => ({
        name: year,
        sorties: count,
      }));
  }

  async getReports(): Promise<ReportsDto> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Get all exits
    const allExits = await this.exitRepository.find({
      relations: ['student'],
    });

    // Filter exits from this month
    const exitsThisMonth = allExits.filter(exit => {
      const exitDate = new Date(exit.createdAt || exit.departureDate);
      return exitDate >= firstDayOfMonth;
    });

    // Calculate total exits this month
    const totalExitsThisMonth = exitsThisMonth.length;

    // Calculate average exit duration
    const completedExits = allExits.filter(exit => exit.actualReturnDate);
    let totalDurationDays = 0;
    completedExits.forEach(exit => {
      if (exit.actualReturnDate) {
        const departure = new Date(exit.departureDate);
        const returnDate = new Date(exit.actualReturnDate);
        const diffTime = returnDate.getTime() - departure.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        totalDurationDays += diffDays;
      }
    });
    const avgExitDuration = completedExits.length > 0 
      ? Math.round((totalDurationDays / completedExits.length) * 10) / 10 
      : 0;

    // Find most visited destination
    const destinationCount: { [key: string]: number } = {};
    allExits.forEach(exit => {
      const dest = exit.destination || 'Unknown';
      destinationCount[dest] = (destinationCount[dest] || 0) + 1;
    });
    
    const mostVisitedDestination = Object.keys(destinationCount).length > 0
      ? Object.entries(destinationCount).sort(([, a], [, b]) => b - a)[0][0]
      : 'N/A';

    // Calculate exits by reason
    const reasonCount: { [key: string]: number } = {};
    allExits.forEach(exit => {
      const reason = exit.reason || 'Unknown';
      reasonCount[reason] = (reasonCount[reason] || 0) + 1;
    });

    const exitsByReason: ExitsByReasonDto[] = Object.entries(reasonCount)
      .map(([reason, count]) => ({
        reason,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    // Get exits over time (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    const recentExits = allExits.filter(exit => {
      const exitDate = new Date(exit.createdAt || exit.departureDate);
      return exitDate >= twelveMonthsAgo;
    });

    const exitsOverTime = this.calculateMonthlyTrendsForReports(recentExits);

    return {
      totalExitsThisMonth,
      avgExitDuration,
      mostVisitedDestination,
      exitsByReason,
      exitsOverTime,
    };
  }

  private calculateMonthlyTrendsForReports(exits: Exit[]): ChartDataDto[] {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData: { [key: string]: number } = {};
    
    // Initialize last 12 months
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      monthlyData[monthKey] = 0;
    }

    // Count exits by month
    exits.forEach(exit => {
      const date = new Date(exit.createdAt || exit.departureDate);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      if (monthlyData.hasOwnProperty(monthKey)) {
        monthlyData[monthKey]++;
      }
    });

    // Convert to array format
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    
    return Array.from({ length: 12 }, (_, i) => {
      const targetDate = new Date(nowYear, nowMonth - (11 - i), 1);
      const monthKey = `${targetDate.getFullYear()}-${targetDate.getMonth()}`;
      const monthLabel = `${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;
      
      return {
        name: monthLabel,
        sorties: monthlyData[monthKey] || 0,
      };
    });
  }
}