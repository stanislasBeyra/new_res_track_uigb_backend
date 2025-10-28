import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Exit } from '../exits/entities/exit.entity';
import { UserStatus } from '../enum/userstatus';
import { ExitStatus } from '../enum/entry_exit_status';
import { UserRole } from '../enum/userrole';
import { DashboardStatsDto, RecentActivityDto, DashboardDataDto, ChartDataDto, ExitsTrendsDto } from './dto/dashboard.dto';

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
}