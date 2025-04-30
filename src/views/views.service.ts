import { Injectable } from '@nestjs/common';
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
      return {message: error.message}
    }
  }
}
