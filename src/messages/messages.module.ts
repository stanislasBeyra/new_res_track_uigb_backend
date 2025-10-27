import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './entities/message.entity';
import { Group } from './entities/goup.entity';
import { GroupMember } from './entities/group_member.entity';
import { Friend } from './entities/friend.entity';
import { User } from '../users/entities/user.entity';
import { WebsocketModule } from '../websocket/websocket.module';
import { FcmTokensModule } from '../fcm-tokens/fcm-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Group, GroupMember, Friend, User]),
    WebsocketModule,
    FcmTokensModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
