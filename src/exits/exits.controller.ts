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
  @ApiOperation({ summary: 'Créer une demande de sortie (étudiant)' })
  @ApiResponse({ status: 201, description: 'Sortie créée avec succès', type: Exit })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  create(@Body() createExitDto: CreateExitDto, @CurrentUser('id') userId: number): Promise<Exit> {
    return this.exitsService.createStudentExit(createExitDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les sorties (admin)' })
  @ApiResponse({ status: 200, description: 'Liste des sorties', type: [Exit] })
  findAll(): Promise<Exit[]> {
    return this.exitsService.findAllByAdmin();
  }

  @Get('my-exits')
  @ApiOperation({ summary: 'Récupérer mes sorties (étudiant connecté)' })
  @ApiResponse({ status: 200, description: 'Liste de mes sorties', type: [Exit] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  getMyExits(@Request() req): Promise<Exit[]> {
    return this.exitsService.findAllExitsByStudent(req.user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques globales des sorties (admin)' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques des sorties',
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
  @ApiOperation({ summary: 'Récupérer mes statistiques de sorties (étudiant connecté)' })
  @ApiResponse({
    status: 200,
    description: 'Mes statistiques de sorties',
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
  @ApiOperation({ summary: 'Récupérer les sorties d\'un étudiant spécifique (admin)' })
  @ApiParam({ name: 'studentId', description: 'ID de l\'étudiant', type: 'number' })
  @ApiResponse({ status: 200, description: 'Liste des sorties de l\'étudiant', type: [Exit] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Étudiant non trouvé' })
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
  @ApiOperation({ summary: 'Récupérer les statistiques d\'un étudiant spécifique (admin)' })
  @ApiParam({ name: 'studentId', description: 'ID de l\'étudiant', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques de l\'étudiant',
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
  @ApiOperation({ summary: 'Marquer le retour d\'une sortie' })
  @ApiResponse({ status: 200, description: 'Retour enregistré avec succès', type: Exit })
  @ApiResponse({ status: 404, description: 'Sortie non trouvée' })
  recordReturn(@Param('id') id: string): Promise<Exit> {
    return this.exitsService.recordReturn(+id);
  }
}
