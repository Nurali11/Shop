import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createViewDto: CreateViewDto, @Req() req: Request) {
    return this.viewsService.create(createViewDto, req);
  }

  @UseGuards(AuthGuard)
  @Get("my-views")
  myViews(@Req() req: Request){
    return this.viewsService.myViews(req)
  }
}
