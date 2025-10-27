import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const ip = headers['x-forwarded-for'] || request.ip;

    const now = Date.now();

    // Log de la requête entrante
    this.logger.log(
      `📥 ${method} ${url} - IP: ${ip} - User-Agent: ${userAgent.substring(0, 50)}...`
    );

    // Log du body si présent (sauf mot de passe)
    if (body && Object.keys(body).length > 0) {
      const sanitizedBody = { ...body };
      if (sanitizedBody.password) {
        sanitizedBody.password = '***HIDDEN***';
      }
      this.logger.debug(`📦 Body: ${JSON.stringify(sanitizedBody)}`);
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
          const delay = Date.now() - now;

          this.logger.log(
            `📤 ${method} ${url} - Status: ${statusCode} - ${delay}ms`
          );
        },
        error: (error) => {
          const delay = Date.now() - now;
          this.logger.error(
            `❌ ${method} ${url} - Error: ${error.message} - ${delay}ms`
          );
        },
      })
    );
  }
}
