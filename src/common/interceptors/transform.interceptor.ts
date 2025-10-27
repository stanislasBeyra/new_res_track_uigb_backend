import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: response.statusCode,
        message: this.getSuccessMessage(context),
        data,
      })),
    );
  }

  private getSuccessMessage(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const route = request.route?.path || '';

    // Messages personnalisés selon la méthode HTTP
    if (method === 'POST') {
      return 'Resource created successfully';
    } else if (method === 'PATCH' || method === 'PUT') {
      if (route.includes('profile-picture')) {
        return 'Profile picture uploaded successfully';
      }
      return 'Resource updated successfully';
    } else if (method === 'DELETE') {
      return 'Resource deleted successfully';
    } else if (method === 'GET') {
      return 'Resource retrieved successfully';
    }

    return 'Operation successful';
  }
}
