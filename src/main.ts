import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.filter';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuration pour servir les fichiers statiques (uploads)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Interceptors globaux
  app.useGlobalInterceptors(
    new LoggingInterceptor(),      // Logger les requêtes
    new TransformInterceptor(),    // Transformer les réponses
  );

  // Filters globaux (ordre important!)
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new ValidationExceptionFilter(),
    new HttpExceptionFilter(),
    new DatabaseExceptionFilter(),
  );

  // CORS
  // main.ts
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://votre-domaine.com','http://localhost:3000','http://192.168.100.5:3000']
        : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: '*',
  });

  app.setGlobalPrefix('api', {
    exclude: ['/', 'health', 'metrics', 'docs', 'upload'], // Ces routes n'auront pas le prefix
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Restrack API')
    .setDescription('API pour le système de suivi de résidence étudiante')
    .setVersion('1.0')
    .addTag('Users', 'Gestion des utilisateurs')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Restrack API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(3006);

  console.log('\n' + '='.repeat(60));
  console.log('🚀 Application démarrée sur: http://localhost:3006/api');
  console.log('📚 Documentation Swagger: http://localhost:3006/docs');
  console.log('💬 WebSocket Chat: ws://localhost:3006/chat');
  console.log('🔔 WebSocket Notifications: ws://localhost:3006/notifications');
  console.log('='.repeat(60) + '\n');
  console.log('📊 Logs des requêtes HTTP activés');
  console.log('✅ Prêt à recevoir des requêtes...\n');
}
bootstrap();
