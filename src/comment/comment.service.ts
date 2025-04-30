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
      return {message: error.message}
    }
  }

  async myComments(req: Request){
    try {
      let my = await this.prisma.comments.findMany({where: {userId: req['user'].id}})
      return my
    } catch (error) {
      return {message: error.message}
    }
  }
  async findAll() {
    try {
      let all = await this.prisma.comments.findMany()
      return all
    } catch (error) {
      return {message: error.message}
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.comments.findFirst({where: {id}})
      return one
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: number, data: UpdateCommentDto) {
    try {
      let updated = await this.prisma.comments.update({where: {id}, data})
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.comments.delete({where: {id}})
      return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
