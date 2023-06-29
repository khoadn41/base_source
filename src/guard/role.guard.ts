import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/config/role';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService, 
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<Array<string>>(
        'roles',
        context.getHandler(),
      );

      if (!roles || roles.length === 0) return true;

      const request = context.switchToHttp().getRequest();
      const bearerToken = request?.headers?.authorization;
      if (!bearerToken) {
        return false;
      }
      const token = bearerToken.slice(7);
      if (!token || !token.length) {
        return false;
      }

      let user = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = user;
      return roles.includes(user?.role) || roles.includes(Role.ALL);
    } catch (error) {
      return false;
    }
  }
}
