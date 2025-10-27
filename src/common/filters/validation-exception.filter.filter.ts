import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    // Log l'erreur de validation avec tous les détails
    this.logger.error('🚨 Erreur de validation détectée:');
    this.logger.error(`Message: ${JSON.stringify(exceptionResponse.message)}`);
    if (Array.isArray(exceptionResponse.message)) {
      exceptionResponse.message.forEach((err: string) => {
        this.logger.error(`  - ${err}`);
      });
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: 'Erreur de validation',
      errors: exceptionResponse.message || [],
    };

    response.status(status).json(errorResponse);
  }
}
