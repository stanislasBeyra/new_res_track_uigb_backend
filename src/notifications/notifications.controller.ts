import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';

@ApiTags('Notifications')
@ApiBearerAuth('JWT-auth')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer les notifications de l\'utilisateur connecté' })
  @ApiQuery({ name: 'unreadOnly', required: false, type: Boolean })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Liste des notifications' })
  async getMyNotifications(
    @Request() req,
    @Query('unreadOnly') unreadOnly?: boolean,
    @Query('limit') limit?: number,
  ): Promise<Notification[]> {
    return this.notificationsService.getUserNotifications(req.user.id, {
      unreadOnly,
      limit,
    });
  }

  @Get('unread/count')
  @ApiOperation({ summary: 'Compter les notifications non lues' })
  @ApiResponse({ status: 200, description: 'Nombre de notifications non lues' })
  async getUnreadCount(@Request() req): Promise<{ count: number }> {
    const count = await this.notificationsService.countUnread(req.user.id);
    return { count };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marquer une notification comme lue' })
  @ApiParam({ name: 'id', description: 'ID de la notification' })
  @ApiResponse({ status: 200, description: 'Notification marquée comme lue' })
  async markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Notification> {
    return this.notificationsService.markAsRead(id, req.user.id);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Marquer toutes les notifications comme lues' })
  @ApiResponse({ status: 200, description: 'Toutes les notifications marquées comme lues' })
  async markAllAsRead(@Request() req): Promise<{ message: string }> {
    await this.notificationsService.markAllAsRead(req.user.id);
    return { message: 'All notifications marked as read' };
  }
}
