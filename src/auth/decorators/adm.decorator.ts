import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AdmAuthorization implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const userData = request.user;

    if (userData?.role === 'adm') {
      return true;
    }

    throw new UnauthorizedException(
      'unauthorized user',
    );
  }
}
