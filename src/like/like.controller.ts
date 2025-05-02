import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, DislikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthGuard)
  @Post()
  like(@Body() createLikeDto: CreateLikeDto, @Req() req: Request) {
    return this.likeService.create(createLikeDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete("dislike")
  dislike(@Body() createLikeDto: DislikeDto,@Req() req: Request) {
    return this.likeService.dislike(createLikeDto, req);
  }

  @UseGuards(AuthGuard)
  @Get("my-likes")
  myLikes(@Req() req: Request){
    return this.likeService.myLikes(req)
  }

}