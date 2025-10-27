"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
var getDatabaseConfig = function (configService) { return ({
    type: 'mysql',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 3306),
    username: configService.get('DB_USERNAME', 'root'),
    password: configService.get('DB_PASSWORD', ''),
    database: configService.get('DB_DATABASE', 'residence_db'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') === 'development',
    logging: configService.get('DB_LOGGING', false),
    autoLoadEntities: true,
    charset: 'utf8mb4',
    timezone: '+00:00',
    extra: {
        connectionLimit: 10,
    },
    // Retry logic
    retryAttempts: 3,
    retryDelay: 3000,
}); };
exports.getDatabaseConfig = getDatabaseConfig;
