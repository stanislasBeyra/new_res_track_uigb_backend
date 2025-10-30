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
  @ApiOperation({ summary: 'Register an FCM token' })
  @ApiResponse({ status: 201, description: 'Token registered', type: FcmToken })
  async registerToken(
    @Body() dto: RegisterTokenDto,
    @Request() req,
  ): Promise<FcmToken> {
    return this.fcmTokensService.registerToken(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get my FCM tokens' })
  @ApiResponse({ status: 200, description: 'List of tokens', type: [FcmToken] })
  async getMyTokens(@Request() req): Promise<FcmToken[]> {
    return this.fcmTokensService.getUserTokens(req.user.id);
  }

  // envoyer notification (test)

  @Public()
  @Post('send-test')
  @ApiOperation({ summary: 'Send a test notification' })
  @ApiResponse({ status: 201, description: 'Notification sent successfully' })
  @ApiResponse({ status: 404, description: 'No active token found for this user' })
  @ApiBody({ type: SendTestNotificationDto }) // Optional but recommended
  async sendTestNotification(@Body() dto: SendTestNotificationDto) {
    return this.fcmTokensService.sendTestNotification(dto.userId, dto.title, dto.body);
  }

  @Patch(':id/subscribe')
  @ApiOperation({ summary: 'Subscribe to a topic' })
  @ApiParam({ name: 'id', description: 'Token ID' })
  @ApiResponse({ status: 200, description: 'Subscribed to topic', type: FcmToken })
  async subscribeToTopic(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SubscribeTopicDto,
    @Request() req,
  ): Promise<FcmToken> {
    return this.fcmTokensService.subscribeToTopic(req.user.id, id, dto.topic);
  }

  @Patch(':id/unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe from a topic' })
  @ApiParam({ name: 'id', description: 'Token ID' })
  @ApiResponse({ status: 200, description: 'Unsubscribed from topic', type: FcmToken })
  async unsubscribeFromTopic(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SubscribeTopicDto,
    @Request() req,
  ): Promise<FcmToken> {
    return this.fcmTokensService.unsubscribeFromTopic(req.user.id, id, dto.topic);
  }

  @Patch(':id/deactivate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deactivate a token' })
  @ApiParam({ name: 'id', description: 'Token ID' })
  @ApiResponse({ status: 204, description: 'Token deactivated' })
  async deactivateToken(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.fcmTokensService.deactivateToken(req.user.id, id);
  }

  @Delete(':token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a token' })
  @ApiParam({ name: 'token', description: 'FCM Token' })
  @ApiResponse({ status: 204, description: 'Token deleted' })
  async deleteToken(
    @Param('token') token: string,
    @Request() req,
  ): Promise<void> {
    return this.fcmTokensService.deleteToken(req.user.id, token);
  }
}
