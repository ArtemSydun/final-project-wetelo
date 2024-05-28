import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import User from 'src/database/models/users';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await User.findOne({where: { id: request.user.sub}});

    // Return a boolean indicating if the user has the 'admin' role
    return user && user.role === 'admin';
  }
}
