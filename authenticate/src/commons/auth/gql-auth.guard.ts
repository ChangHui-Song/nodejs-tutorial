import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('guard') {
  getRequest(context: ExecutionContext) {
    console.log('before context: ', context);
    const ctx = GqlExecutionContext.create(context);
    console.log('after context: ', ctx);
    return ctx.getContext().req;
  }
}
