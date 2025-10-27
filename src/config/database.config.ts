import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const dbType = configService.get<string>('DB_TYPE', 'mysql');

  const baseConfig = {
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 3306),
    username: configService.get<string>('DB_USERNAME', 'root'),
    password: configService.get<string>('DB_PASSWORD', ''),
    database: configService.get<string>('DB_DATABASE', 'residence_db'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: !isProduction, // Seulement en développement
    logging: configService.get<boolean>('DB_LOGGING', false),
    autoLoadEntities: true,
    retryAttempts: 3,
    retryDelay: 3000,
  };

  // Configuration pour PostgreSQL (Render)
  if (dbType === 'postgres') {
    return {
      ...baseConfig,
      type: 'postgres',
      extra: {
        ssl: isProduction ? { rejectUnauthorized: false } : false,
      },
    };
  }

  // Configuration pour MySQL (local ou autre)
  return {
    ...baseConfig,
    type: 'mysql',
    charset: 'utf8mb4',
    timezone: '+00:00',
    extra: {
      connectionLimit: 10,
    },
  };
};
