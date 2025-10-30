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

    // Log the error
    this.logger.error('Database Error:', exception);

    let message = 'Database error';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // Handle specific MySQL errors
    const error = exception as any;

    // Unique constraint violation
    if (error.code === 'ER_DUP_ENTRY') {
      status = HttpStatus.CONFLICT;
      message = 'This value already exists in the database';
    }

    // Foreign key violation
    else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid reference to a non-existent entity';
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
