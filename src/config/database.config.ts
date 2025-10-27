import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USERNAME', 'root'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_DATABASE', 'residence_db'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get<string>('NODE_ENV') === 'development',
  logging: configService.get<boolean>('DB_LOGGING', false),
  autoLoadEntities: true,
  charset: 'utf8mb4',
  timezone: '+00:00',

  extra: {
    connectionLimit: 10,
  },

  // Retry logic
  retryAttempts: 3,
  retryDelay: 3000,
});
