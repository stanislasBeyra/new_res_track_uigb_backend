import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface SearchCriteria {
  search?: string;
  level?: string;
  status?: string;
  roomNumber?: string;
}

export const SearchCriteria = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SearchCriteria => {
    const request = ctx.switchToHttp().getRequest();

    return {
      search: request.query.search,
      level: request.query.level,
      status: request.query.status,
      roomNumber: request.query.roomNumber,
    };
  },
);
