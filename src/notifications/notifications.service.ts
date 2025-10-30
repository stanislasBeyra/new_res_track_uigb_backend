import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { NotificationsGateway } from './notifications.gateway';
import { UserRole } from '../enum/userrole';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  // Créer une notification et l'envoyer en temps réel
  async createAndNotify(data: {
    userId: number;
    type: NotificationType;
    title: string;
    message: string;
    exitId?: number;
    metadata?: Record<string, any>;
  }): Promise<Notification> {
    // Créer la notification en base de données
    const notification = this.notificationRepository.create(data);
    const savedNotification = await this.notificationRepository.save(notification);

    // Charger les relations pour le payload WebSocket
    const fullNotification = await this.notificationRepository.findOne({
      where: { id: savedNotification.id },
      relations: ['user', 'exit', 'exit.student'],
    });

    if (!fullNotification) {
      throw new Error('Notification not found after creation');
    }

    // Envoyer via WebSocket
    this.notificationsGateway.notifyUser(data.userId, 'notification:new', {
      id: fullNotification.id,
      type: fullNotification.type,
      title: fullNotification.title,
      message: fullNotification.message,
      exitId: fullNotification.exitId,
      isRead: fullNotification.isRead,
      createdAt: fullNotification.createdAt,
      metadata: fullNotification.metadata,
    });

    return fullNotification;
  }

  // Notifier tous les admins (pour les nouvelles sorties)
  async notifyAllAdmins(data: {
    type: NotificationType;
    title: string;
    message: string;
    exitId?: number;
    metadata?: Record<string, any>;
  }): Promise<Notification[]> {
    // Récupérer tous les admins
    const admins = await this.userRepository.find({
      where: { role: UserRole.ADMIN, isActive: true },
    });

    console.log(`📊 Nombre d'admins trouvés: ${admins.length}`);

    if (admins.length === 0) {
      console.warn('⚠️ No active admin found to receive the notification');
      return [];
    }

    const notifications: Notification[] = [];

    // Créer une notification pour chaque admin
    for (const admin of admins) {
      try {
        const notification = await this.createAndNotify({
          userId: admin.id,
          ...data,
        });
        notifications.push(notification);
        console.log(`✅ Notification created for admin ID ${admin.id}`);
      } catch (error) {
        console.error(`❌ Error creating notification for admin ${admin.id}:`, error.message);
      }
    }

    // Envoyer aussi via WebSocket à tous les admins connectés
    this.notificationsGateway.notifyAdmins('notification:new', {
      type: data.type,
      title: data.title,
      message: data.message,
      exitId: data.exitId,
      createdAt: new Date(),
      metadata: data.metadata,
    });

    return notifications;
  }

  // Notifier plusieurs utilisateurs spécifiques
  async notifyUsers(userIds: number[], data: {
    type: NotificationType;
    title: string;
    message: string;
    exitId?: number;
    metadata?: Record<string, any>;
  }): Promise<Notification[]> {
    if (userIds.length === 0) {
      console.warn('⚠️ No user specified to receive the notification');
      return [];
    }

    const notifications: Notification[] = [];

    // Créer une notification pour chaque utilisateur
    for (const userId of userIds) {
      try {
        const notification = await this.createAndNotify({
          userId,
          ...data,
        });
        notifications.push(notification);
        console.log(`✅ Notification created for user ID ${userId}`);
      } catch (error) {
        console.error(`❌ Error creating notification for user ${userId}:`, error.message);
      }
    }

    return notifications;
  }

  // Marquer une notification comme lue
  async markAsRead(notificationId: number, userId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.isRead = true;
    notification.readAt = new Date();

    return await this.notificationRepository.save(notification);
  }

  // Récupérer les notifications d'un utilisateur
  async getUserNotifications(
    userId: number,
    options?: { unreadOnly?: boolean; limit?: number },
  ): Promise<Notification[]> {
    const query = this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.userId = :userId', { userId })
      .leftJoinAndSelect('notification.exit', 'exit')
      .leftJoinAndSelect('exit.student', 'student')
      .orderBy('notification.createdAt', 'DESC');

    if (options?.unreadOnly) {
      query.andWhere('notification.isRead = :isRead', { isRead: false });
    }

    if (options?.limit) {
      query.take(options.limit);
    }

    return await query.getMany();
  }

  // Compter les notifications non lues
  async countUnread(userId: number): Promise<number> {
    return await this.notificationRepository.count({
      where: { userId, isRead: false },
    });
  }

  // Marquer toutes les notifications comme lues
  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true, readAt: new Date() },
    );
  }
}
