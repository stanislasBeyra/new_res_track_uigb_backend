import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmTokensService } from './fcm-tokens.service';
import { FcmTokensController } from './fcm-tokens.controller';
import { FcmToken } from './entities/fcm-token.entity';
import { FcmService } from './fcm.service';

@Module({
  imports: [TypeOrmModule.forFeature([FcmToken])],
  controllers: [FcmTokensController],
  providers: [FcmTokensService, FcmService],
  exports: [FcmTokensService, FcmService],
})
export class FcmTokensModule {}
