import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Req() req: Request) {
    return this.messageService.create(createMessageDto, req);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('my-messages')
  myMessages(@Req() req: Request) {
    return this.messageService.MyMessages(req['user'].id);
  }

  @Get('chat')
  byChatId(@Query('chatId') chatId: number) {
    return this.messageService.findByChatId(+chatId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto, @Req() req: Request) {
    return this.messageService.update(+id, updateMessageDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.messageService.remove(+id, req);
  }
}
