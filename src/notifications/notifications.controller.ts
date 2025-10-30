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
  @ApiOperation({ summary: 'Get notifications for the logged in user' })
  @ApiQuery({ name: 'unreadOnly', required: false, type: Boolean })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of notifications' })
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
  @ApiOperation({ summary: 'Count unread notifications' })
  @ApiResponse({ status: 200, description: 'Number of unread notifications' })
  async getUnreadCount(@Request() req): Promise<{ count: number }> {
    const count = await this.notificationsService.countUnread(req.user.id);
    return { count };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Notification> {
    return this.notificationsService.markAsRead(id, req.user.id);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  async markAllAsRead(@Request() req): Promise<{ message: string }> {
    await this.notificationsService.markAllAsRead(req.user.id);
    return { message: 'All notifications marked as read' };
  }
}
