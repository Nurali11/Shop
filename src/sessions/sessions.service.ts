import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(
    private prisma: PrismaService
  ){}
  async findAll(req: Request) {
    try {
      let sessions = await this.prisma.sessions.findMany({where: {userId: req['user'].id}})
      return sessions
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number, req: Request) {
    try {
      let deleted = await this.prisma.sessions.delete({where: {userId: req['userId'], id}})
      return deleted
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
