import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class CheckGuard implements CanActivate {

  constructor(private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean{
    try {
        const req: Request = context.switchToHttp().getRequest();
    
        const token = req.headers.authorization?.split(' ')?.[1];
    
        if(!token){
            return req["user"] = false
        }

        let data = this.jwt.verify(token, {secret: "access"})
          req['user'] = {
            id: data['id'],
            role: data['role']
          }
        return true
    } catch (error) {
        throw new BadRequestException(error.message)
    }
  }
}
