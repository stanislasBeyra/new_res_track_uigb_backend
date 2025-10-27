import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExitsService } from './exits.service';
import { ExitsController } from './exits.controller';
import { Exit } from './entities/exit.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exit]),
    NotificationsModule, // Pour injecter NotificationsService
    UsersModule, // Pour injecter UsersService
    MessagesModule, // Pour injecter MessagesService
  ],
  controllers: [ExitsController],
  providers: [ExitsService],
  exports: [ExitsService],
})
export class ExitsModule {}
