import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { User } from '../users/entities/user.entity';
import { Exit } from '../exits/entities/exit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Exit]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
