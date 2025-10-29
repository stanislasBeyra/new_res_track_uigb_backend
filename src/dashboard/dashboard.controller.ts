import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardDataDto, ExitsTrendsDto, ReportsDto } from './dto/dashboard.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserRole } from '../enum/userrole';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get dashboard data',
    description: 'Retrieve comprehensive dashboard statistics and recent activities for admin users'
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard data retrieved successfully',
    type: DashboardDataDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Admin role required',
  })
  async getDashboardData(): Promise<DashboardDataDto> {
    return await this.dashboardService.getDashboardData();
  }

  @Get('stats')
  @ApiOperation({ 
    summary: 'Get dashboard statistics only',
    description: 'Retrieve only the statistics part of the dashboard data'
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard statistics retrieved successfully',
  })
  async getDashboardStats() {
    const dashboardData = await this.dashboardService.getDashboardData();
    return dashboardData.stats;
  }

  @Get('trends')
  @ApiOperation({ 
    summary: 'Get exits trends data',
    description: 'Retrieve exits trends data for charts (monthly, weekly, yearly)'
  })
  @ApiResponse({
    status: 200,
    description: 'Exits trends data retrieved successfully',
    type: ExitsTrendsDto,
  })
  async getExitsTrends(): Promise<ExitsTrendsDto> {
    return await this.dashboardService.getExitsTrends();
  }

  @Get('reports')
  @Public()
  @ApiOperation({ 
    summary: 'Get reports and analytics data',
    description: 'Retrieve reports data including exits statistics, average duration, most visited destinations, and exits by reason'
  })
  @ApiResponse({
    status: 200,
    description: 'Reports data retrieved successfully',
    type: ReportsDto,
  })
  async getReports(): Promise<ReportsDto> {
    return await this.dashboardService.getReports();
  }
}