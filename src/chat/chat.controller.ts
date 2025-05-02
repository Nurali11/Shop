import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CheckGuard } from 'src/auth/check.jwt.guard';
import { Request } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("my-chats")
  myChats(@Req() req: Request){
    return this.chatService.myChats(req)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @UseGuards(CheckGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.chatService.remove(+id, req);
  }
}
