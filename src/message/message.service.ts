import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateMessageDto) {
    try {
      let message = await this.prisma.message.create({data})

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
      return {message: error.message}
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
      return {message: error.message}
    }
  }
  async findByChatId(chatId: number){
    try {
      let messages = await this.prisma.message.findMany({where: {chatId}})
      return messages
    } catch (error) {
      return {message: error.message}
    }
  }
  async findOne(id: number) {
    try {
      
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    try {
      
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: number) {
    try {
      
    } catch (error) {
      return {message: error.message}
    }
  }
}
