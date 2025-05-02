import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { ViewsService } from 'src/views/views.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { contains } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private view: ViewsService
  ){}
  async create(data: CreateProductDto, req: Request) {
    try {
      
      let user = await this.prisma.user.findFirst({where: {id: req['user'].id}})
      if(!user){
        throw new BadRequestException(`User with ${req['user'].id} id not found`)
      }

      let category = await this.prisma.category.findFirst({where: {id: data.categoryId}})
      if(!category){
        throw new BadRequestException(`Category with ${data.categoryId} id not found`)
      }

      for(let i of data.colors){
        let find = await this.prisma.color.findFirst({where: {id: i}})
        if(!find){
          throw new BadRequestException(`Color with ${i} id not found`)
        }
      }
      let newPrd = await this.prisma.product.create({
        data: {
          ...data,
          userId: req['user'].id,
          colors: {
            connect: data.colors.map((id)=> ({id}))
          }
        }
      })
      return newPrd
    } catch (error) {
      return error.message
    }
  }

  async findAll(query: ProductQueryDto) {
    const {
      name,
      type,
      status,
      categoryId,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = query;
  
    const where: any = {};

    if(name) where.name = {contains: name, mode: "insensitive"}
    if (type) where.type = type;
    if (status) where.status = status;
    if (categoryId) where.categoryId = +categoryId;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = +minPrice;
      if (maxPrice) where.price.lte = +maxPrice;
    }

    const products =  this.prisma.product.findMany({
      where,
      skip: +(page - 1) * +limit,
      take: +limit,
      include: { Category: true, Views: true, Likes: true, Comments: true, colors: true, User: true }
    });

    const withAvgStar = (await products).map(product => {
      const comments = product.Comments;
      const starSum = comments.reduce((acc, c) => acc + (c.star || 0), 0);
      const avgStar = comments.length ? +(starSum / comments.length).toFixed(1) : null;
  
      return {
        ...product,
        avgStar,
      };
    });
  
    return withAvgStar;
  }
  

  async findOne(id: number, req: Request) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          User: true,
          Category: true,
          colors: true,
          Likes: true,
          Views: true,
          Comments: {
            include: {
              User: true, // если хочешь видеть кто оставил комментарий
            }
          }
        }
      });
  
      if (!product) {
        throw new BadRequestException(`Product with ID ${id} not found`);
      }
  
      // Увеличить просмотры, если пользователь авторизован
      if (req['user']) {
        await this.view.create({ productId: product.id }, req);
      }
  
      // Вычисление средней оценки
      const totalStars = product.Comments.reduce((sum, c) => sum + (c.star || 0), 0);
      const avgStar = product.Comments.length
        ? +(totalStars / product.Comments.length).toFixed(1)
        : null;
  
      // Возвращаем всё вместе с computed fields
      return {
        ...product,
        avgStar,
        viewsCount: product.Views.length,
        likesCount: product.Likes.length,
        commentsCount: product.Comments.length,
      };
  
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
  

  async update(id: number, data: UpdateProductDto, req: Request) {
    try {
      let find = await this.prisma.product.findFirst({where: {id}})
      if(!["SUPER-ADMIN", 'ADMIN'].includes(req['user'].role) && req['user'].id == find?.userId){
        throw new BadRequestException("You cannot update others product! Only ADMIN or SUPER-ADMIN can update others product")
      }
      let updated = await this.prisma.product.update({where:
        {id},
        data:{
          ...data,
          colors: data.colors
          ? {
              set: data.colors.map(id => ({ id })),
            }
          : undefined,
        }})
      if(!updated){
        throw new BadRequestException(`Product with ${id} id not  found`)
      }
      return updated
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number, req: Request) {
    try {
      let find = await this.prisma.product.findFirst({where: {id}})
      if(!['ADMIN'].includes(req['user'].role) && req['user'].id == find?.userId){
        throw new BadRequestException("You cannot delete others product! Only ADMIN or SUPER-ADMIN can delete others product")
      }
      let deleted = await this.prisma.product.delete({where: {id}})
      if(!deleted){
        throw new BadRequestException(`Product with ${id} id not  found`)
      }
      return deleted
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
