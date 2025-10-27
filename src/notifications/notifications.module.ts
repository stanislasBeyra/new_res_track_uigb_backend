import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsController } from './notifications.controller';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User]),
    JwtModule.register({}), // Pour la validation JWT dans le gateway
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
