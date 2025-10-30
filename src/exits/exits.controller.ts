import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ExitsService } from './exits.service';
import { CreateExitDto } from './dto/create-exit.dto';
import { UpdateExitDto } from './dto/update-exit.dto';
import { Exit } from './entities/exit.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Exits')
@ApiBearerAuth('JWT-auth')
@Controller('exits')
export class ExitsController {
  constructor(private readonly exitsService: ExitsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an exit request (student)' })
  @ApiResponse({ status: 201, description: 'Exit created successfully', type: Exit })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createExitDto: CreateExitDto, @CurrentUser('id') userId: number): Promise<Exit> {
    return this.exitsService.createStudentExit(createExitDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exits (admin)' })
  @ApiResponse({ status: 200, description: 'List of exits', type: [Exit] })
  findAll(): Promise<Exit[]> {
    return this.exitsService.findAllByAdmin();
  }

  @Get('my-exits')
  @ApiOperation({ summary: 'Get my exits (logged in student)' })
  @ApiResponse({ status: 200, description: 'List of my exits', type: [Exit] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMyExits(@Request() req): Promise<Exit[]> {
    return this.exitsService.findAllExitsByStudent(req.user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get global exit statistics (admin)' })
  @ApiResponse({
    status: 200,
    description: 'Exit statistics',
    schema: {
      properties: {
        total: { type: 'number', example: 150 },
        enCours: { type: 'number', example: 45 },
        terminees: { type: 'number', example: 95 },
        enRetard: { type: 'number', example: 10 }
      }
    }
  })
  getGlobalStats(): Promise<{ total: number; enCours: number; terminees: number; enRetard: number }> {
    return this.exitsService.getExitStats();
  }

  @Get('stats/my-stats')
  @ApiOperation({ summary: 'Get my exit statistics (logged in student)' })
  @ApiResponse({
    status: 200,
    description: 'My exit statistics',
    schema: {
      properties: {
        total: { type: 'number', example: 10 },
        enCours: { type: 'number', example: 2 },
        terminees: { type: 'number', example: 7 },
        enRetard: { type: 'number', example: 1 }
      }
    }
  })
  getMyStats(@Request() req): Promise<{ total: number; enCours: number; terminees: number; enRetard: number }> {
    return this.exitsService.getExitStats(req.user.id);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get exits for a specific student (admin)' })
  @ApiParam({ name: 'studentId', description: 'Student ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'List of student exits', type: [Exit] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  getStudentExits(
    @Param('studentId') studentId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<{ exits: Exit[]; total: number; page: number; totalPages: number }> {
    return this.exitsService.findAllExitsByStudentIdWithPagination(
      +studentId,
      +page,
      +limit,
      startDate,
      endDate
    );
  }

  @Get('stats/:studentId')
  @ApiOperation({ summary: 'Get statistics for a specific student (admin)' })
  @ApiParam({ name: 'studentId', description: 'Student ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Student statistics',
    schema: {
      properties: {
        total: { type: 'number', example: 10 },
        enCours: { type: 'number', example: 2 },
        terminees: { type: 'number', example: 7 },
        enRetard: { type: 'number', example: 1 }
      }
    }
  })
  getStudentStats(@Param('studentId') studentId: string): Promise<{ total: number; enCours: number; terminees: number; enRetard: number }> {
    return this.exitsService.getExitStats(+studentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExitDto: UpdateExitDto) {
    return this.exitsService.update(+id, updateExitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exitsService.remove(+id);
  }

  @Patch(':id/return')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark exit return' })
  @ApiResponse({ status: 200, description: 'Return recorded successfully', type: Exit })
  @ApiResponse({ status: 404, description: 'Exit not found' })
  recordReturn(@Param('id') id: string): Promise<Exit> {
    return this.exitsService.recordReturn(+id);
  }
}
