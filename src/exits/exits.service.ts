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

    // Update student status to "ON_EXIT"
    try {
      await this.usersService.update(studentId, { status: UserStatus.SORTIE });
    } catch (error) {
      console.error('Error updating student status:', error);
    }

    // Load relations for notification
    const fullExit = await this.exitRepository.findOne({
      where: { id: savedExit.id },
      relations: ['student'],
    });

    if (!fullExit) {
      throw new Error('Exit not found after creation');
    }

    // Notify all admins in real time
    try {
      const notifications = await this.notificationsService.notifyAllAdmins({
        type: NotificationType.EXIT_CREATED,
        title: 'New exit request',
        message: `${fullExit.student.firstName} ${fullExit.student.lastName} created an exit request to ${fullExit.destination}`,
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
            'ResTrack - New Exit',
            `${fullExit.student.firstName} ${fullExit.student.lastName} created an exit request to ${fullExit.destination}`,
            'exit',
            fullExit.id.toString()
          );
          console.log(`📱 Push notification sent to ${adminIds.length} administrator(s)`);
        }
      } catch (pushError) {
        console.error('❌ Error sending push notifications:', pushError.message);
        // Don't block exit creation even if push notification fails
      }
    } catch (error) {
      console.error('❌ Error creating notifications:', error.message);
      // Don't block exit creation even if notification fails
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

    // Add date filters if provided
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

    // Count total
    const total = await queryBuilder.getCount();

    // Apply pagination
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

    // Update fields
    if (updateExitDto.reason) exit.reason = updateExitDto.reason;
    if (updateExitDto.destination) exit.destination = updateExitDto.destination;
    if (updateExitDto.description !== undefined) exit.description = updateExitDto.description;

    if (updateExitDto.departureDate) {
      exit.departureDate = new Date(updateExitDto.departureDate);
    }
    if (updateExitDto.expectedReturnDate) {
      exit.expectedReturnDate = new Date(updateExitDto.expectedReturnDate);
    }

    // Update status automatically
    exit.updateStatus();

    return await this.exitRepository.save(exit);
  }

  async recordReturn(id: number, actualReturnDate?: Date): Promise<Exit> {
    const exit = await this.findOne(id);

    exit.actualReturnDate = actualReturnDate || new Date();
    exit.updateStatus();

    const updatedExit = await this.exitRepository.save(exit);

    // Reset student status to "PRESENT"
    try {
      await this.usersService.update(exit.studentId, { status: UserStatus.PRESENT });
    } catch (error) {
      console.error('Error updating student status:', error);
    }

    // Notify student of recorded return
    await this.notificationsService.createAndNotify({
      userId: exit.studentId,
      type: exit.delayDays > 0 ? NotificationType.EXIT_LATE : NotificationType.EXIT_RETURN,
      title: exit.delayDays > 0 ? 'Late return recorded' : 'Return recorded',
      message: exit.delayDays > 0
        ? `Your return has been recorded with ${exit.delayDays} day(s) delay`
        : 'Your return has been recorded successfully',
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
