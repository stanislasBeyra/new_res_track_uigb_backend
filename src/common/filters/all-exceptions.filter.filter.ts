import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Erreur interne du serveur';

    // Log de l'erreur
    this.logger.error(
      `Status: ${status} Error: ${JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : '',
    );

    const errorResponse = {
      success: false,
      message:
        typeof message === 'string'
          ? message
          : (message as any).message || 'Une erreur est survenue',
      error: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
      },
    };

    response.status(status).json(errorResponse);
  }
}
