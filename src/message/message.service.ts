import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateMessageDto, req: Request) {
    try {
      let message = await this.prisma.message.create({
        data: {
          ...data,
          fromId: req['user'].id
        }
      })
      return message
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.message.findMany()
      return all
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async MyMessages(myId: number){
    try {
      let messages = await this.prisma.message.findMany({where: {
        OR: [
          {fromId: +myId},
          {toId: +myId}
        ]
      }})

      return messages
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
  async findByChatId(chatId: number){
    try {
      let messages = await this.prisma.message.findMany({where: {chatId}})
      return messages
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
  async findOne(id: number) {
    try {
      let message = await this.prisma.message.findFirst({where: {id}})
      return message
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async update(id: number, updateMessageDto: UpdateMessageDto, req: Request) {
    try {
      let find = await this.prisma.message.findFirst({where: {id}})
      if([find?.fromId, find?.toId].includes(req['user'].id) && req['user'].role != "ADMIN"){
        throw new BadRequestException("You cannot update others messages!")
      }
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number, req: Request) {
    try {
      let find = await this.prisma.message.findFirst({where: {id}})
      if([find?.fromId, find?.toId].includes(req['user'].id) && req['user'].role != "ADMIN"){
        throw new BadRequestException("You cannot update others messages!")
      }

      let deleted = await this.prisma.message.delete({where: {id}})
      return deleted
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
