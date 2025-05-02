import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CheckGuard } from 'src/auth/check.jwt.guard';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto, @Req() req: Request) {
    return this.chatService.create(createChatDto, req);
  }

  @ApiQuery({
      name: "fromId",
      required: false
    })
    @ApiQuery({
      name: "toId",
      required: false
    })
    
  @Get()
  findAll(@Query("fromId") fromId: number, @Query("toId") toId: number) {
    return this.chatService.findAll(fromId, toId);
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
