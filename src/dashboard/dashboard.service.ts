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
    // Récupérer tous les étudiants (utilisateurs avec role STUDENT)
    const students = await this.userRepository.find({
      where: { role: UserRole.STUDENT },
      relations: ['exits'],
    });

    // Récupérer toutes les sorties avec les relations étudiant
    const exits = await this.exitRepository.find({
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });

    // Calculer les statistiques
    const stats = this.calculateStats(students, exits);

    // Générer l'activité récente
    const recentActivity = this.generateRecentActivity(exits, students);

    // Récupérer les 5 dernières sorties
    const recentExits = exits.slice(0, 5);

    return {
      stats,
      recentActivity,
      recentExits,
    };
  }

  private calculateStats(students: User[], exits: Exit[]): DashboardStatsDto {
    // Statistiques des étudiants
    const totalStudents = students.length;
    const studentsPresent = students.filter(s => s.status === UserStatus.PRESENT).length;
    const studentsOnExit = students.filter(s => s.status === UserStatus.SORTIE).length;

    // Statistiques des sorties
    const totalExits = exits.length;
    const exitsInProgress = exits.filter(e => e.status === ExitStatus.EN_COURS).length;
    const exitsCompleted = exits.filter(e => e.status === ExitStatus.TERMINEE).length;
    const exitsLate = exits.filter(e => e.status === ExitStatus.EN_RETARD).length;

    // Calculer le taux d'occupation
    const occupancyRate = totalStudents > 0 ? Math.round((studentsPresent / totalStudents) * 100) : 0;

    // Calculer les problèmes en attente
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

    // Activités basées sur les sorties récentes (5 dernières)
    exits.slice(0, 5).forEach(exit => {
      if (exit.status === ExitStatus.EN_COURS) {
        activities.push({
          type: 'exit',
          message: `${exit.student?.firstName} ${exit.student?.lastName} est en sortie`,
          color: 'blue',
          timestamp: exit.createdAt?.toISOString() || new Date(exit.departureDate).toISOString(),
        });
      } else if (exit.status === ExitStatus.TERMINEE) {
        activities.push({
          type: 'return',
          message: `${exit.student?.firstName} ${exit.student?.lastName} est revenu de sortie`,
          color: 'green',
          timestamp: exit.actualReturnDate ? new Date(exit.actualReturnDate).toISOString() : exit.updatedAt?.toISOString() || exit.createdAt?.toISOString(),
        });
      } else if (exit.status === ExitStatus.EN_RETARD) {
        activities.push({
          type: 'late',
          message: `${exit.student?.firstName} ${exit.student?.lastName} est en retard`,
          color: 'orange',
          timestamp: exit.actualReturnDate ? new Date(exit.actualReturnDate).toISOString() : exit.updatedAt?.toISOString() || exit.createdAt?.toISOString(),
        });
      }
    });

    // Ajouter des activités basées sur les nouveaux étudiants (dernière semaine)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newStudents = students
      .filter(s => s.createdAt && new Date(s.createdAt) > oneWeekAgo)
      .slice(0, 2);

    newStudents.forEach(student => {
      activities.push({
        type: 'new',
        message: `Nouvel étudiant enregistré: ${student.firstName} ${student.lastName}`,
        color: 'green',
        timestamp: student.createdAt?.toISOString() || new Date().toISOString(),
      });
    });

    // Trier par timestamp et retourner les 5 plus récentes
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  }

  async getExitsTrends(): Promise<ExitsTrendsDto> {
    // Récupérer toutes les sorties
    const exits = await this.exitRepository.find({
      order: { createdAt: 'ASC' },
    });

    // Calculer les tendances mensuelles (12 derniers mois)
    const monthly = this.calculateMonthlyTrends(exits);

    // Calculer les tendances hebdomadaires (8 dernières semaines)
    const weekly = this.calculateWeeklyTrends(exits);

    // Calculer les tendances annuelles (4 dernières années)
    const yearly = this.calculateYearlyTrends(exits);

    return {
      monthly,
      weekly,
      yearly,
    };
  }

  private calculateMonthlyTrends(exits: Exit[]): ChartDataDto[] {
    const monthlyData: { [key: string]: number } = {};
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    // Initialiser tous les mois à 0
    monthNames.forEach(month => {
      monthlyData[month] = 0;
    });

    // Compter les sorties par mois
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
    
    // Calculer les 8 dernières semaines
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
        name: `Sem ${8 - i}`,
        sorties: weekExits.length,
      });
    }

    return weeklyData;
  }

  private calculateYearlyTrends(exits: Exit[]): ChartDataDto[] {
    const yearlyData: { [key: string]: number } = {};
    
    // Compter les sorties par année
    exits.forEach(exit => {
      const date = new Date(exit.createdAt || exit.departureDate);
      const year = date.getFullYear().toString();
      yearlyData[year] = (yearlyData[year] || 0) + 1;
    });

    // Convertir en array et trier par année
    return Object.entries(yearlyData)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([year, count]) => ({
        name: year,
        sorties: count,
      }));
  }
}