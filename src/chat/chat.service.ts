import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.chat.findMany()
      return all
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

  async update(id: number, updateChatDto: UpdateChatDto) {
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
