import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { FcmTokensService } from './fcm-tokens.service';
import { RegisterTokenDto } from './dto/register-token.dto';
import { SubscribeTopicDto } from './dto/subscribe-topic.dto';
import { FcmToken } from './entities/fcm-token.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { SendTestNotificationDto } from './dto/send-test-notification.dto';

@ApiTags('FCM Tokens')
@ApiBearerAuth('JWT-auth')
@Controller('fcm-tokens')
export class FcmTokensController {
  constructor(private readonly fcmTokensService: FcmTokensService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Enregistrer un FCM token' })
  @ApiResponse({ status: 201, description: 'Token enregistré', type: FcmToken })
  async registerToken(
    @Body() dto: RegisterTokenDto,
    @Request() req,
  ): Promise<FcmToken> {
    return this.fcmTokensService.registerToken(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer mes FCM tokens' })
  @ApiResponse({ status: 200, description: 'Liste des tokens', type: [FcmToken] })
  async getMyTokens(@Request() req): Promise<FcmToken[]> {
    return this.fcmTokensService.getUserTokens(req.user.id);
  }

  // envoyer notification (test)

  @Public()
  @Post('send-test')
  @ApiOperation({ summary: 'Envoyer une notification de test' })
  @ApiResponse({ status: 201, description: 'Notification envoyée avec succès' })
  @ApiResponse({ status: 404, description: 'Aucun token actif trouvé pour cet utilisateur' })
  @ApiBody({ type: SendTestNotificationDto }) // Optionnel mais recommandé
  async sendTestNotification(@Body() dto: SendTestNotificationDto) {
    return this.fcmTokensService.sendTestNotification(dto.userId, dto.title, dto.body);
  }

  @Patch(':id/subscribe')
  @ApiOperation({ summary: 'S\'abonner à un topic' })
  @ApiParam({ name: 'id', description: 'ID du token' })
  @ApiResponse({ status: 200, description: 'Abonné au topic', type: FcmToken })
  async subscribeToTopic(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SubscribeTopicDto,
    @Request() req,
  ): Promise<FcmToken> {
    return this.fcmTokensService.subscribeToTopic(req.user.id, id, dto.topic);
  }

  @Patch(':id/unsubscribe')
  @ApiOperation({ summary: 'Se désabonner d\'un topic' })
  @ApiParam({ name: 'id', description: 'ID du token' })
  @ApiResponse({ status: 200, description: 'Désabonné du topic', type: FcmToken })
  async unsubscribeFromTopic(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SubscribeTopicDto,
    @Request() req,
  ): Promise<FcmToken> {
    return this.fcmTokensService.unsubscribeFromTopic(req.user.id, id, dto.topic);
  }

  @Patch(':id/deactivate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Désactiver un token' })
  @ApiParam({ name: 'id', description: 'ID du token' })
  @ApiResponse({ status: 204, description: 'Token désactivé' })
  async deactivateToken(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.fcmTokensService.deactivateToken(req.user.id, id);
  }

  @Delete(':token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un token' })
  @ApiParam({ name: 'token', description: 'FCM Token' })
  @ApiResponse({ status: 204, description: 'Token supprimé' })
  async deleteToken(
    @Param('token') token: string,
    @Request() req,
  ): Promise<void> {
    return this.fcmTokensService.deleteToken(req.user.id, token);
  }
}
