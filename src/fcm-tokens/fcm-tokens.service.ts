import { Injectable, NotFoundException, Inject, forwardRef, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { FcmToken } from './entities/fcm-token.entity';
import { RegisterTokenDto } from './dto/register-token.dto';
import { FcmService } from './fcm.service';

@Injectable()
export class FcmTokensService {
  private readonly logger = new Logger(FcmTokensService.name);

  constructor(
    @InjectRepository(FcmToken)
    private readonly fcmTokenRepository: Repository<FcmToken>,
    @Inject(forwardRef(() => FcmService))
    private readonly fcmService: FcmService,
  ) { }

  /**
   * Enregistrer ou mettre à jour un FCM token
   */
  async registerToken(userId: number, dto: RegisterTokenDto): Promise<FcmToken> {
    // Vérifier si l'utilisateur a déjà un token pour ce deviceId
    let fcmToken: FcmToken | null = null;

    if (dto.deviceId) {
      fcmToken = await this.fcmTokenRepository.findOne({
        where: { userId, deviceId: dto.deviceId },
      });
    }

    // Si pas trouvé par deviceId, chercher par token exact
    if (!fcmToken) {
      fcmToken = await this.fcmTokenRepository.findOne({
        where: { userId, token: dto.token },
      });
    }

    if (fcmToken) {
      // Mettre à jour le token existant
      fcmToken.token = dto.token; // Mettre à jour le token (peut avoir changé)
      fcmToken.deviceType = dto.deviceType || fcmToken.deviceType;
      fcmToken.deviceId = dto.deviceId || fcmToken.deviceId;
      fcmToken.topics = dto.topics || fcmToken.topics;
      fcmToken.isActive = true;
      fcmToken.lastUsedAt = new Date();

      this.logger.log(`🔄 Updating existing token for user ${userId}`);
    } else {
      // Créer un nouveau token
      fcmToken = this.fcmTokenRepository.create({
        userId,
        token: dto.token,
        deviceType: dto.deviceType,
        deviceId: dto.deviceId,
        topics: dto.topics || [],
        lastUsedAt: new Date(),
      });

      this.logger.log(`✨ Creating new token for user ${userId}`);
    }

    const savedToken = await this.fcmTokenRepository.save(fcmToken);

    // Abonner automatiquement aux topics Firebase si des topics sont fournis
    if (dto.topics && dto.topics.length > 0) {
      for (const topic of dto.topics) {
        try {
          await this.fcmService.subscribeToTopic(dto.token, topic);
        } catch (error) {
          console.error(`❌ Erreur lors de l'abonnement au topic ${topic}:`, error);
        }
      }
    }

    return savedToken;
  }

  /**
   * Récupérer tous les tokens d'un utilisateur
   */
  async getUserTokens(userId: number): Promise<FcmToken[]> {
    return this.fcmTokenRepository.find({
      where: { userId, isActive: true },
      order: { lastUsedAt: 'DESC' },
    });
  }

  /**
   * Récupérer tous les tokens actifs d'un utilisateur
   */
  async getActiveTokens(userId: number): Promise<string[]> {
    const tokens = await this.fcmTokenRepository.find({
      where: { userId, isActive: true },
      select: ['token'],
    });

    return tokens.map((t) => t.token);
  }

  /**
   * S'abonner à un topic
   */
  async subscribeToTopic(userId: number, tokenId: number, topic: string): Promise<FcmToken> {
    const fcmToken = await this.fcmTokenRepository.findOne({
      where: { id: tokenId, userId },
    });

    if (!fcmToken) {
      throw new NotFoundException('Token not found');
    }

    // Ajouter le topic s'il n'existe pas déjà
    if (!fcmToken.topics) {
      fcmToken.topics = [];
    }

    if (!fcmToken.topics.includes(topic)) {
      fcmToken.topics.push(topic);
    }

    // Abonner le token au topic Firebase
    await this.fcmService.subscribeToTopic(fcmToken.token, topic);

    return this.fcmTokenRepository.save(fcmToken);
  }

  /**
   * Se désabonner d'un topic
   */
  async unsubscribeFromTopic(userId: number, tokenId: number, topic: string): Promise<FcmToken> {
    const fcmToken = await this.fcmTokenRepository.findOne({
      where: { id: tokenId, userId },
    });

    if (!fcmToken) {
      throw new NotFoundException('Token not found');
    }

    if (fcmToken.topics) {
      fcmToken.topics = fcmToken.topics.filter((t) => t !== topic);
    }

    // Désabonner le token du topic Firebase
    await this.fcmService.unsubscribeFromTopic(fcmToken.token, topic);

    return this.fcmTokenRepository.save(fcmToken);
  }

  /**
   * Désactiver un token
   */
  async deactivateToken(userId: number, tokenId: number): Promise<void> {
    const fcmToken = await this.fcmTokenRepository.findOne({
      where: { id: tokenId, userId },
    });

    if (!fcmToken) {
      throw new NotFoundException('Token not found');
    }

    fcmToken.isActive = false;
    await this.fcmTokenRepository.save(fcmToken);
  }

  /**
   * Supprimer un token
   */
  async deleteToken(userId: number, token: string): Promise<void> {
    await this.fcmTokenRepository.delete({ userId, token });
  }

  /**
   * Récupérer tous les tokens d'un topic
   */
  async getTokensByTopic(topic: string): Promise<string[]> {
    const tokens = await this.fcmTokenRepository
      .createQueryBuilder('fcm_token')
      .where('fcm_token.is_active = :isActive', { isActive: true })
      .andWhere(':topic = ANY(fcm_token.topics)', { topic })
      .select(['fcm_token.token'])
      .getMany();

    return tokens.map((t) => t.token);
  }

  /**
   * Récupérer tous les tokens actifs de plusieurs utilisateurs
   */
  async getTokensByUserIds(userIds: number[]): Promise<string[]> {
    if (userIds.length === 0) {
      return [];
    }

    const tokens = await this.fcmTokenRepository.find({
      where: { isActive: true },
      select: ['token', 'userId'],
    });

    return tokens
      .filter((t) => userIds.includes(t.userId))
      .map((t) => t.token);
  }

  /**
   * Nettoyer les tokens inactifs (plus de 90 jours)
   */
  async cleanupInactiveTokens(): Promise<number> {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const result = await this.fcmTokenRepository
      .createQueryBuilder()
      .delete()
      .where('is_active = :isActive', { isActive: false })
      .andWhere('updated_at < :date', { date: ninetyDaysAgo })
      .execute();

    return result.affected || 0;
  }

  async sendTestNotification(userId: number, title: string, body: string): Promise<void> {
    const tokens = await this.getActiveTokens(userId);
    if (tokens.length === 0) {
      throw new NotFoundException('No active tokens found for user');
    }

    // Envoyer à chaque token et gérer les tokens invalides
    const results = await Promise.allSettled(
      tokens.map(token => this.fcmService.sendToToken(token, { title, body }))
    );

    // Supprimer les tokens invalides
    const invalidTokens: string[] = [];
    results.forEach((result, index) => {
      if (result.status === 'rejected' && result.reason?.invalidToken) {
        invalidTokens.push(result.reason.invalidToken);
      }
    });

    if (invalidTokens.length > 0) {
      await this.fcmTokenRepository.delete({ token: In(invalidTokens) });
      this.logger.warn(`🗑️ Removed ${invalidTokens.length} invalid token(s)`);
    }

    // Vérifier si au moins un message a été envoyé avec succès
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    if (successCount === 0) {
      throw new Error('Failed to send notification to any device');
    }

    this.logger.log(`✅ Notification sent to ${successCount}/${tokens.length} device(s)`);
  }
}
