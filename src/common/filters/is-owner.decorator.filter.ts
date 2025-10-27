import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IsOwner = createParamDecorator(
  (resourceIdParam: string, ctx: ExecutionContext): boolean => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = parseInt(request.params[resourceIdParam]);

    return user?.id === resourceId;
  },
);
