import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { User } from '../users/entities/user.entity';
import { MessagesModule } from '../messages/messages.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MessagesModule,
    NotificationsModule,
  ],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
