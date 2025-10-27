import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Log de l'erreur
    this.logger.error('Database Error:', exception);

    let message = 'Erreur de base de données';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // Gérer les erreurs spécifiques MySQL
    const error = exception as any;

    // Violation de contrainte unique
    if (error.code === 'ER_DUP_ENTRY') {
      status = HttpStatus.CONFLICT;
      message = 'Cette valeur existe déjà dans la base de données';
    }

    // Violation de clé étrangère
    else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Référence invalide vers une entité inexistante';
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
      error:
        process.env.NODE_ENV === 'development' ? error.sqlMessage : undefined,
    };

    response.status(status).json(errorResponse);
  }
}
