import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateCommentDto, req: Request) {
    try {
      let prd = await this.prisma.product.findFirst({where: {id: data.productId}})
      if(!prd){
        throw new BadRequestException("Product not found")
      }
      let newComment = await this.prisma.comments.create({
        data:{
          ...data,
          userId: req['user'].id
        }
      })
      return newComment
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async myComments(req: Request){
    try {
      let my = await this.prisma.comments.findMany({where: {userId: req['user'].id}})
      return my
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
  async findAll(productId: number, fromId: number) {
    try {
      let filter:any = {}
      if(productId){filter.productId = productId}
      if(fromId){filter.fromId = fromId}

      let all = await this.prisma.comments.findMany({where: filter})
      return all
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.comments.findFirst({where: {id}})
      return one
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async update(id: number, data: UpdateCommentDto, req: Request) {
    try {
      let find = await this.prisma.comments.findFirst({where: {id}})
      if(!["ADMIN", "SUPER-ADMIN"].includes(req['user'].role) && req['user'].id != find?.userId){
        throw new BadRequestException("You cannot update others comment! Only ADMIN or SUPER-ADMIN can!")
      }
      let updated = await this.prisma.comments.update({where: {id}, data})
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number, req: Request) {
    try {
      let find = await this.prisma.comments.findFirst({where: {id}})
      if(req['user'].role != "ADMIN" && req['user'].id != find?.userId){
        throw new BadRequestException("You cannot delete others comment! Only ADMIN can!")
      }
      let deleted = await this.prisma.comments.delete({where: {id}})
      return deleted
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
