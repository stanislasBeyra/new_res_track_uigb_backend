import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../enum/userrole';
import { MessagesService } from '../messages/messages.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/entities/notification.entity';

export interface EmergencyAlertData {
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  targetAudience: 'all' | 'students' | 'admins';
}

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly messagesService: MessagesService,
    private readonly notificationsService: NotificationsService,
  ) {}

  /**
   * Envoyer une alerte d'urgence à tous les étudiants
   */
  async sendEmergencyAlertToStudents(alertData: EmergencyAlertData): Promise<{
    success: boolean;
    studentsNotified: number;
    pushNotificationsSent: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let studentsNotified = 0;
    let pushNotificationsSent = 0;

    try {
      // Récupérer tous les étudiants
      const students = await this.userRepository.find({
        where: { role: UserRole.STUDENT },
        select: ['id', 'firstName', 'lastName', 'email']
      });

      if (students.length === 0) {
        return {
          success: false,
          studentsNotified: 0,
          pushNotificationsSent: 0,
          errors: ['No students found']
        };
      }

      const studentIds = students.map(student => student.id);

      // Créer des notifications pour tous les étudiants
      try {
        const notifications = await this.notificationsService.notifyUsers(
          studentIds,
          {
            type: NotificationType.SYSTEM,
            title: alertData.title,
            message: alertData.message,
            metadata: {
              priority: alertData.priority,
              alertType: 'emergency',
              timestamp: new Date().toISOString(),
            },
          }
        );
        studentsNotified = notifications.length;
        console.log(`✅ ${studentsNotified} notification(s) créée(s) pour les étudiants`);
      } catch (notificationError: any) {
        errors.push(`Notification error: ${notificationError.message}`);
        console.error('❌ Error creating notifications:', notificationError);
      }

      // Envoyer des notifications push à tous les étudiants
      try {
        await this.messagesService.sendPushNotificationToUsers(
          studentIds,
          '🚨 ResTrack - Alerte Urgence',
          alertData.message,
          'private',
          'emergency-alert'
        );
        pushNotificationsSent = studentIds.length;
        console.log(`📱 ${pushNotificationsSent} push notification(s) sent to students`);
      } catch (pushError: any) {
        errors.push(`Push notification error: ${pushError.message}`);
        console.error('❌ Error sending push notifications:', pushError);
      }

      return {
        success: errors.length === 0,
        studentsNotified,
        pushNotificationsSent,
        errors
      };

    } catch (error: any) {
      console.error('❌ General error sending emergency alert:', error);
      return {
        success: false,
        studentsNotified: 0,
        pushNotificationsSent: 0,
        errors: [`General error: ${error.message}`]
      };
    }
  }

  /**
   * Envoyer une alerte d'urgence à tous les utilisateurs (étudiants + admins)
   */
  async sendEmergencyAlertToAll(alertData: EmergencyAlertData): Promise<{
    success: boolean;
    usersNotified: number;
    pushNotificationsSent: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let usersNotified = 0;
    let pushNotificationsSent = 0;

    try {
      // Récupérer tous les utilisateurs
      const users = await this.userRepository.find({
        select: ['id', 'firstName', 'lastName', 'email', 'role']
      });

      if (users.length === 0) {
        return {
          success: false,
          usersNotified: 0,
          pushNotificationsSent: 0,
          errors: ['No users found']
        };
      }

      const userIds = users.map(user => user.id);

      // Créer des notifications pour tous les utilisateurs
      try {
        const notifications = await this.notificationsService.notifyUsers(
          userIds,
          {
            type: NotificationType.SYSTEM,
            title: alertData.title,
            message: alertData.message,
            metadata: {
              priority: alertData.priority,
              alertType: 'emergency',
              timestamp: new Date().toISOString(),
            },
          }
        );
        usersNotified = notifications.length;
        console.log(`✅ ${usersNotified} notification(s) créée(s) pour tous les utilisateurs`);
      } catch (notificationError: any) {
        errors.push(`Notification error: ${notificationError.message}`);
        console.error('❌ Error creating notifications:', notificationError);
      }

      // Envoyer des notifications push à tous les utilisateurs
      try {
        await this.messagesService.sendPushNotificationToUsers(
          userIds,
          '🚨 ResTrack - Alerte Urgence',
          alertData.message,
          'private',
          'emergency-alert'
        );
        pushNotificationsSent = userIds.length;
        console.log(`📱 ${pushNotificationsSent} push notification(s) sent to all users`);
      } catch (pushError: any) {
        errors.push(`Push notification error: ${pushError.message}`);
        console.error('❌ Error sending push notifications:', pushError);
      }

      return {
        success: errors.length === 0,
        usersNotified,
        pushNotificationsSent,
        errors
      };

    } catch (error: any) {
      console.error('❌ General error sending emergency alert:', error);
      return {
        success: false,
        usersNotified: 0,
        pushNotificationsSent: 0,
        errors: [`General error: ${error.message}`]
      };
    }
  }

  /**
   * Obtenir les statistiques des alertes
   */
  async getAlertStats(): Promise<{
    totalStudents: number;
    totalAdmins: number;
    totalUsers: number;
  }> {
    try {
      const [totalStudents, totalAdmins, totalUsers] = await Promise.all([
        this.userRepository.count({ where: { role: UserRole.STUDENT } }),
        this.userRepository.count({ where: { role: UserRole.ADMIN } }),
        this.userRepository.count()
      ]);

      return {
        totalStudents,
        totalAdmins,
        totalUsers
      };
    } catch (error) {
      console.error('❌ Error retrieving statistics:', error);
      return {
        totalStudents: 0,
        totalAdmins: 0,
        totalUsers: 0
      };
    }
  }
}
