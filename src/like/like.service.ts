import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto, DislikeDto } from './dto/create-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class LikeService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateLikeDto, req: Request) {
    try {

      let existing = await this.prisma.likes.findFirst({where: {userId: req['user'].id}})
      if(existing){
        return "You have already liked this product"
      }

      let product = await this.prisma.product.findFirst({where: {id: data.productId}})
      if(!product){
        throw new BadRequestException(`Product with ${data.productId} id not found`)
      }

      let like = await this.prisma.likes.create({
        data: {
          userId: req['user'].id,
          ...data
        }
      })

      return like
    } catch (error) {
      return {message: error.message}
    }
  }

  async dislike(data: DislikeDto, req: Request) {
    try {
      let product = await this.prisma.product.findFirst({where: {id: data.productId}})
      if(!product){
        throw new BadRequestException(`Product with ${data.productId} id not found`)
      }

      let find = await this.prisma.likes.findFirst({where: {
        userId: req['user'].id,
        productId: data.productId
      }})

      if(!find){
        return "You have not liked this product yet"
      }

      let disliked = await this.prisma.likes.delete({
        where: {id: find?.id}
      })

      return {
        message: "Disliked successfully",
        data: disliked
      }
    } catch (error) {
      return {message: error.message}
    }
  }
}
