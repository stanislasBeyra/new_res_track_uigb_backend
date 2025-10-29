import { ApiProperty } from '@nestjs/swagger';

export class DashboardStatsDto {
  @ApiProperty({
    description: 'Total number of students',
    example: 250,
  })
  totalStudents: number;

  @ApiProperty({
    description: 'Number of students currently present',
    example: 238,
  })
  studentsPresent: number;

  @ApiProperty({
    description: 'Number of students currently on exit',
    example: 12,
  })
  studentsOnExit: number;

  @ApiProperty({
    description: 'Total number of exits',
    example: 45,
  })
  totalExits: number;

  @ApiProperty({
    description: 'Number of exits in progress',
    example: 12,
  })
  exitsInProgress: number;

  @ApiProperty({
    description: 'Number of completed exits',
    example: 30,
  })
  exitsCompleted: number;

  @ApiProperty({
    description: 'Number of late exits',
    example: 3,
  })
  exitsLate: number;

  @ApiProperty({
    description: 'Occupancy rate percentage',
    example: 95,
  })
  occupancyRate: number;

  @ApiProperty({
    description: 'Number of pending issues',
    example: 3,
  })
  pendingIssues: number;
}

export class RecentActivityDto {
  @ApiProperty({
    description: 'Activity type',
    example: 'exit',
  })
  type: string;

  @ApiProperty({
    description: 'Activity message',
    example: 'John Doe est en sortie',
  })
  message: string;

  @ApiProperty({
    description: 'Activity color for UI',
    example: 'blue',
  })
  color: string;

  @ApiProperty({
    description: 'Activity timestamp',
    example: '2025-01-15T10:30:00Z',
  })
  timestamp: string;
}

export class DashboardDataDto {
  @ApiProperty({
    description: 'Dashboard statistics',
    type: DashboardStatsDto,
  })
  stats: DashboardStatsDto;

  @ApiProperty({
    description: 'Recent activities',
    type: [RecentActivityDto],
  })
  recentActivity: RecentActivityDto[];

  @ApiProperty({
    description: 'Recent exits (last 5)',
    type: 'array',
    items: { type: 'object' },
  })
  recentExits: any[];
}

export class ChartDataDto {
  @ApiProperty({
    description: 'Period name (e.g., "Jan", "Sem 1", "2024")',
    example: 'Jan',
  })
  name: string;

  @ApiProperty({
    description: 'Number of exits for this period',
    example: 45,
  })
  sorties: number;
}

export class ExitsTrendsDto {
  @ApiProperty({
    description: 'Monthly trends data',
    type: [ChartDataDto],
  })
  monthly: ChartDataDto[];

  @ApiProperty({
    description: 'Weekly trends data',
    type: [ChartDataDto],
  })
  weekly: ChartDataDto[];

  @ApiProperty({
    description: 'Yearly trends data',
    type: [ChartDataDto],
  })
  yearly: ChartDataDto[];
}

export class ExitsByReasonDto {
  @ApiProperty({
    description: 'Exit reason',
    example: 'Medical',
  })
  reason: string;

  @ApiProperty({
    description: 'Number of exits for this reason',
    example: 25,
  })
  count: number;
}

export class ReportsDto {
  @ApiProperty({
    description: 'Total exits this month',
    example: 345,
  })
  totalExitsThisMonth: number;

  @ApiProperty({
    description: 'Average exit duration in days',
    example: 2.5,
  })
  avgExitDuration: number;

  @ApiProperty({
    description: 'Most visited destination',
    example: 'New York',
  })
  mostVisitedDestination: string;

  @ApiProperty({
    description: 'Exits grouped by reason',
    type: [ExitsByReasonDto],
  })
  exitsByReason: ExitsByReasonDto[];

  @ApiProperty({
    description: 'Exits over time (monthly data for the last 12 months)',
    type: [ChartDataDto],
  })
  exitsOverTime: ChartDataDto[];
}
