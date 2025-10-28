import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Message, MulticastMessage } from 'firebase-admin/messaging';
import * as path from 'path';
import { join } from 'path';

// Configuration pour désactiver les notifications push
const PUSH_NOTIFICATIONS_ENABLED = process.env.PUSH_NOTIFICATIONS_ENABLED === 'true';

export interface NotificationPayload {
  title: string;
  body: string;
  imageUrl?: string;
  data?: Record<string, string>;
}

@Injectable()
export class FcmService implements OnModuleInit {
  private readonly logger = new Logger(FcmService.name);

  // onModuleInit() {
  //   try {
  //     // Initialiser Firebase Admin SDK
  //     const serviceAccountPath = path.join(
  //       __dirname,
  //       '../config/uigb-ef896-firebase-adminsdk-fbsvc-2f3757dc89.json',
  //     );

  //     admin.initializeApp({
  //       credential: admin.credential.cert(serviceAccountPath),
  //     });

  //     this.logger.log('✅ Firebase Admin SDK initialized successfully');
  //   } catch (error) {
  //     this.logger.error('❌ Failed to initialize Firebase Admin SDK', error);
  //   }
  // }

  onModuleInit() {
    if (!PUSH_NOTIFICATIONS_ENABLED) {
      this.logger.log('⚠️ PUSH_NOTIFICATIONS_ENABLED=false - Firebase Admin SDK initialization skipped');
      return;
    }
    
    // Code pour activer les notifications push
    /*
    try {
      // Chemin absolu depuis la racine du projet
      const serviceAccountPath = join(
        process.cwd(),
        'src',
        'config',
        'uigb-ef896-firebase-adminsdk-fbsvc-2f3757dc89.json'
      );

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountPath),
        });
        this.logger.log('✅ Firebase Admin SDK initialized successfully');
      }
    } catch (error) {
      this.logger.error('❌ Failed to initialize Firebase Admin SDK');
      this.logger.error(error);
    }
    */
  }

  /**
   * Envoyer une notification à un seul token
   */
  async sendToToken(
    token: string,
    notification: NotificationPayload,
  ): Promise<string> {
    if (!PUSH_NOTIFICATIONS_ENABLED) {
      this.logger.debug(`🔕 Push notification skipped (DISABLED): ${notification.title} - ${notification.body}`);
      return 'notification-disabled';
    }
    
    // Code pour envoyer la notification
    const message: Message = {
      token,
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageUrl,
      },
      data: notification.data,
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    };

    try {
      const response = await admin.messaging().send(message);
      this.logger.log(`✅ Message sent successfully: ${response}`);
      return response;
    } catch (error) {
      this.logger.error(`❌ Error sending message to token ${token}:`, error);

      // Si le token n'est plus valide, retourner l'info pour le supprimer
      if (error.errorInfo?.code === 'messaging/registration-token-not-registered' ||
          error.errorInfo?.code === 'messaging/invalid-registration-token') {
        this.logger.warn(`⚠️ Invalid token detected: ${token.substring(0, 20)}...`);
        error.invalidToken = token;
      }

      throw error;
    }
  }

  /**
   * Envoyer une notification à plusieurs tokens
   */
  async sendToMultipleTokens(
    tokens: string[],
    notification: NotificationPayload,
  ): Promise<admin.messaging.BatchResponse> {
    if (!PUSH_NOTIFICATIONS_ENABLED) {
      this.logger.debug(`🔕 Push notifications (${tokens.length} tokens) skipped (DISABLED): ${notification.title}`);
      return {
        successCount: 0,
        failureCount: 0,
        responses: [],
      };
    }
    
    if (tokens.length === 0) {
      this.logger.warn('⚠️ No tokens provided for multicast message');
      return {
        successCount: 0,
        failureCount: 0,
        responses: [],
      };
    }

    const message: MulticastMessage = {
      tokens,
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageUrl,
      },
      data: notification.data,
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      this.logger.log(
        `✅ ${response.successCount} messages sent successfully, ${response.failureCount} failed`,
      );

      // Logger les tokens qui ont échoué
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          this.logger.warn(
            `❌ Failed to send to token ${tokens[idx]}: ${resp.error?.message}`,
          );
        }
      });

      return response;
    } catch (error) {
      this.logger.error('❌ Error sending multicast message:', error);
      throw error;
    }
  }

  /**
   * Envoyer une notification à un topic
   */
  async sendToTopic(
    topic: string,
    notification: NotificationPayload,
  ): Promise<string> {
    const message: Message = {
      topic,
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageUrl,
      },
      data: notification.data,
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    };

    try {
      const response = await admin.messaging().send(message);
      this.logger.log(`✅ Message sent to topic ${topic}: ${response}`);
      return response;
    } catch (error) {
      this.logger.error(`❌ Error sending message to topic ${topic}:`, error);
      throw error;
    }
  }

  /**
   * Abonner un token à un topic
   */
  async subscribeToTopic(token: string, topic: string): Promise<void> {
    try {
      await admin.messaging().subscribeToTopic([token], topic);
      this.logger.log(`✅ Token subscribed to topic ${topic}`);
    } catch (error) {
      this.logger.error(
        `❌ Error subscribing token to topic ${topic}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Abonner plusieurs tokens à un topic
   */
  async subscribeMultipleToTopic(
    tokens: string[],
    topic: string,
  ): Promise<admin.messaging.MessagingTopicManagementResponse> {
    if (tokens.length === 0) {
      this.logger.warn('⚠️ No tokens provided for topic subscription');
      return {
        successCount: 0,
        failureCount: 0,
        errors: [],
      };
    }

    try {
      const response = await admin.messaging().subscribeToTopic(tokens, topic);
      this.logger.log(
        `✅ ${response.successCount} tokens subscribed to topic ${topic}, ${response.failureCount} failed`,
      );
      return response;
    } catch (error) {
      this.logger.error(
        `❌ Error subscribing tokens to topic ${topic}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Désabonner un token d'un topic
   */
  async unsubscribeFromTopic(token: string, topic: string): Promise<void> {
    try {
      await admin.messaging().unsubscribeFromTopic([token], topic);
      this.logger.log(`✅ Token unsubscribed from topic ${topic}`);
    } catch (error) {
      this.logger.error(
        `❌ Error unsubscribing token from topic ${topic}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Désabonner plusieurs tokens d'un topic
   */
  async unsubscribeMultipleFromTopic(
    tokens: string[],
    topic: string,
  ): Promise<admin.messaging.MessagingTopicManagementResponse> {
    if (tokens.length === 0) {
      this.logger.warn('⚠️ No tokens provided for topic unsubscription');
      return {
        successCount: 0,
        failureCount: 0,
        errors: [],
      };
    }

    try {
      const response = await admin
        .messaging()
        .unsubscribeFromTopic(tokens, topic);
      this.logger.log(
        `✅ ${response.successCount} tokens unsubscribed from topic ${topic}, ${response.failureCount} failed`,
      );
      return response;
    } catch (error) {
      this.logger.error(
        `❌ Error unsubscribing tokens from topic ${topic}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Envoyer une notification silencieuse (data-only)
   */
  async sendDataMessage(
    token: string,
    data: Record<string, string>,
  ): Promise<string> {
    const message: Message = {
      token,
      data,
      android: {
        priority: 'high',
      },
      apns: {
        headers: {
          'apns-priority': '10',
        },
        payload: {
          aps: {
            contentAvailable: true,
          },
        },
      },
    };

    try {
      const response = await admin.messaging().send(message);
      this.logger.log(`✅ Data message sent successfully: ${response}`);
      return response;
    } catch (error) {
      this.logger.error(`❌ Error sending data message:`, error);
      throw error;
    }
  }
}
