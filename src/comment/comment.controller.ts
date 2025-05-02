import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    return this.commentService.create(createCommentDto, req);
  }

  @ApiQuery({
      name: "productId",
      required: false
    })
    @ApiQuery({
        name: "fromId",
        required: false
      })
  @Get()
  findAll(@Query("productId") productId: number, @Query("fromId") fromId: number) {
    return this.commentService.findAll(productId, fromId);
  }

  @UseGuards(AuthGuard)
  @Get("my-comments")
  myComments(@Req() req: Request){
    return this.commentService.myComments(req)
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Req() req: Request) {
    return this.commentService.update(+id, updateCommentDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.commentService.remove(+id, req);
  }
}
