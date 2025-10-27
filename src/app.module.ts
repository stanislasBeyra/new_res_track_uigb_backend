import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getDatabaseConfig } from './config/database.config';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ExitsModule } from './exits/exits.module';
import { MessagesModule } from './messages/messages.module';
import { WebsocketModule } from './websocket/websocket.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FcmTokensModule } from './fcm-tokens/fcm-tokens.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    // Configuration des variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuration TypeORM avec fichier séparé
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),

    // Modules métier
    AuthModule,
    UsersModule,
    ExitsModule,
    MessagesModule,
    WebsocketModule,
    NotificationsModule,
    FcmTokensModule,
    DashboardModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
