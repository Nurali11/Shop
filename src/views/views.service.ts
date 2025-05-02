import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ViewsService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateViewDto, req: Request) {
    try {
      let exists = await this.prisma.views.findFirst({where: {
        userId: req['user'].id,
        productId: data.productId
      }})
      if(exists){
        return
      }
      let newView = await this.prisma.views.create({
        data: {
          userId: req['user'].id,
          productId: data.productId
        }
      })

      return newView
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async myViews(req: Request){
    try {
      let my = await this.prisma.views.findMany({where: {userId: req['user'].id}, include: {Product: true}})
      return my
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
