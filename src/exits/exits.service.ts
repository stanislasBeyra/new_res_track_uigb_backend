import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExitDto } from './dto/create-exit.dto';
import { UpdateExitDto } from './dto/update-exit.dto';
import { Exit } from './entities/exit.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/entities/notification.entity';
import { ExitStatus } from 'src/enum/entry_exit_status';
import { UsersService } from '../users/users.service';
import { UserStatus } from 'src/enum/userstatus';
import { MessagesService } from '../messages/messages.service';
import { UserRole } from '../enum/userrole';

@Injectable()
export class ExitsService {
  constructor(
    @InjectRepository(Exit)
    private readonly exitRepository: Repository<Exit>,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  async createStudentExit(createExitDto: CreateExitDto, studentId: number): Promise<Exit> {
    const exit = this.exitRepository.create({
      ...createExitDto,
      departureDate: new Date(createExitDto.departureDate),
      expectedReturnDate: new Date(createExitDto.expectedReturnDate),
      studentId,
    });

    const savedExit = await this.exitRepository.save(exit);

    // Mettre à jour le statut de l'étudiant à "ON_EXIT"
    try {
      await this.usersService.update(studentId, { status: UserStatus.SORTIE });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de l\'étudiant:', error);
    }

    // Charger les relations pour la notification
    const fullExit = await this.exitRepository.findOne({
      where: { id: savedExit.id },
      relations: ['student'],
    });

    if (!fullExit) {
      throw new Error('Exit not found after creation');
    }

    // Notifier tous les admins en temps réel
    try {
      const notifications = await this.notificationsService.notifyAllAdmins({
        type: NotificationType.EXIT_CREATED,
        title: 'Nouvelle demande de sortie',
        message: `${fullExit.student.firstName} ${fullExit.student.lastName} a créé une demande de sortie vers ${fullExit.destination}`,
        exitId: fullExit.id,
        metadata: {
          studentId: fullExit.studentId,
          studentName: `${fullExit.student.firstName} ${fullExit.student.lastName}`,
          destination: fullExit.destination,
          departureDate: fullExit.departureDate,
          expectedReturnDate: fullExit.expectedReturnDate,
        },
      });
      console.log(`✅ ${notifications.length} notification(s) créée(s) pour les admins`);

      // Envoyer des notifications push aux administrateurs
      try {
        const adminUsers = await this.usersService.findByRole(UserRole.ADMIN);
        const adminIds = adminUsers.map(admin => admin.id);
        
        if (adminIds.length > 0) {
          await this.messagesService.sendPushNotificationToUsers(
            adminIds,
            'ResTrack - Nouvelle Sortie',
            `${fullExit.student.firstName} ${fullExit.student.lastName} a créé une demande de sortie vers ${fullExit.destination}`,
            'exit',
            fullExit.id.toString()
          );
          console.log(`📱 Notification push envoyée à ${adminIds.length} administrateur(s)`);
        }
      } catch (pushError) {
        console.error('❌ Erreur lors de l\'envoi des notifications push:', pushError.message);
        // On ne bloque pas la création de l'exit même si la notification push échoue
      }
    } catch (error) {
      console.error('❌ Erreur lors de la création des notifications:', error.message);
      // On ne bloque pas la création de l'exit même si la notification échoue
    }

    return fullExit;
  }

  async findAllByAdmin(): Promise<Exit[]> {
    return await this.exitRepository.find({
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllExitsByStudentIdWithPagination(
    studentId: number,
    page: number = 1,
    limit: number = 10,
    startDate?: string,
    endDate?: string,
  ): Promise<{ exits: Exit[]; total: number; page: number; totalPages: number }> {
    const queryBuilder = this.exitRepository
      .createQueryBuilder('exit')
      .leftJoinAndSelect('exit.student', 'student')
      .where('exit.studentId = :studentId', { studentId })
      .orderBy('exit.createdAt', 'DESC');

    // Ajouter les filtres de date si fournis
    if (startDate) {
      queryBuilder.andWhere('exit.departureDate >= :startDate', { 
        startDate: new Date(startDate) 
      });
    }
    
    if (endDate) {
      queryBuilder.andWhere('exit.departureDate <= :endDate', { 
        endDate: new Date(endDate) 
      });
    }

    // Compter le total
    const total = await queryBuilder.getCount();

    // Appliquer la pagination
    const exits = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      exits,
      total,
      page,
      totalPages,
    };
  }

  async findAllExitsByStudentId(studentId: number): Promise<Exit[]> {
    return await this.exitRepository.find({
      where: { studentId },
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllExitsByStudent(userId: number): Promise<Exit[]> {
    return await this.exitRepository.find({
      where: { studentId: userId },
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Exit> {
    const exit = await this.exitRepository.findOne({
      where: { id },
      relations: ['student'],
    });

    if (!exit) {
      throw new Error('Exit not found');
    }

    return exit;
  }

  async update(id: number, updateExitDto: UpdateExitDto): Promise<Exit> {
    const exit = await this.findOne(id);

    // Mettre à jour les champs
    if (updateExitDto.reason) exit.reason = updateExitDto.reason;
    if (updateExitDto.destination) exit.destination = updateExitDto.destination;
    if (updateExitDto.description !== undefined) exit.description = updateExitDto.description;

    if (updateExitDto.departureDate) {
      exit.departureDate = new Date(updateExitDto.departureDate);
    }
    if (updateExitDto.expectedReturnDate) {
      exit.expectedReturnDate = new Date(updateExitDto.expectedReturnDate);
    }

    // Mettre à jour le statut automatiquement
    exit.updateStatus();

    return await this.exitRepository.save(exit);
  }

  async recordReturn(id: number, actualReturnDate?: Date): Promise<Exit> {
    const exit = await this.findOne(id);

    exit.actualReturnDate = actualReturnDate || new Date();
    exit.updateStatus();

    const updatedExit = await this.exitRepository.save(exit);

    // Remettre le statut de l'étudiant à "PRESENT"
    try {
      await this.usersService.update(exit.studentId, { status: UserStatus.PRESENT });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de l\'étudiant:', error);
    }

    // Notifier l'étudiant du retour enregistré
    await this.notificationsService.createAndNotify({
      userId: exit.studentId,
      type: exit.delayDays > 0 ? NotificationType.EXIT_LATE : NotificationType.EXIT_RETURN,
      title: exit.delayDays > 0 ? 'Retour en retard enregistré' : 'Retour enregistré',
      message: exit.delayDays > 0
        ? `Votre retour a été enregistré avec ${exit.delayDays} jour(s) de retard`
        : 'Votre retour a été enregistré avec succès',
      exitId: exit.id,
      metadata: {
        actualReturnDate: exit.actualReturnDate,
        delayDays: exit.delayDays,
      },
    });

    return updatedExit;
  }

  async remove(id: number): Promise<void> {
    const exit = await this.findOne(id);
    await this.exitRepository.softRemove(exit);
  }

  async getExitStats(studentId?: number): Promise<{
    total: number;
    enCours: number;
    terminees: number;
    enRetard: number;
  }> {
    const whereCondition = studentId ? { studentId } : {};

    const [total, enCours, terminees, enRetard] = await Promise.all([
      this.exitRepository.count({ where: whereCondition }),
      this.exitRepository.count({ where: { ...whereCondition, status: ExitStatus.EN_COURS } }),
      this.exitRepository.count({ where: { ...whereCondition, status: ExitStatus.TERMINEE } }),
      this.exitRepository.count({ where: { ...whereCondition, status: ExitStatus.EN_RETARD } }),
    ]);

    return { total, enCours, terminees, enRetard };
  }
}
