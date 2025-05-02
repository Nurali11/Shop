import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { from } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateChatDto) {
    try {
      const {fromId, toId} = data
      let existing = await this.prisma.chat.findFirst({where: {
        OR: [
          {fromId, toId},
          {fromId: toId, toId: fromId}
        ]
      }})

      if(existing){
        throw new BadRequestException("You already have chat with this user")
        return
      }

      let newChat = await this.prisma.chat.create({data})
      return newChat
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.chat.findMany(
        {include:
          {
            from: {select: {id: true, firstName: true, lastName: true, email: true}},
            to: {select: {id: true, firstName: true, lastName: true, email: true}}, 
            Message: {select: {from: {select: {id: true, firstName: true, email: true}}, text: true}}
          }})
      return all
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }


  async myChats(req: Request){
    try {
      let myChats = await this.prisma.chat.findMany({where: {
        OR: [
          {fromId: req['user'].id},
          {toId: req['user'].id}
        ]
      },
    include: {
      from: {select: {firstName: true, lastName: true, email: true}},
      to: {select: {firstName: true, lastName: true, email: true}},
    }})

      return myChats
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async findOne(id: number) {
    try {
      
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number, req: Request) {
    try {
      let members = await this.prisma.chat.findFirst({where: {
        OR: [
          {fromId: req['user'].id},
          {toId: req['user'].id}
        ]
      },
    include: {from: true, to: true}})
    let users = [members?.from, members?.toId]
      if(req['user'].role != "ADMIN" && !users.includes(req['user'].id)){
        throw new BadRequestException("You cannot delete others chat! Oly ADMIN can")
      }
      let deleted = await this.prisma.chat.delete({where: {id}})

      if(!deleted){
        throw new BadRequestException("Chat not found")
      }
      return deleted
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
