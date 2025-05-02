import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CheckGuard } from 'src/auth/check.jwt.guard';
import { ProductQueryDto } from './dto/product-query.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {    
    return this.productService.create(createProductDto, req);
  }

  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  @UseGuards(CheckGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.productService.findOne(+id, req);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: Request) {
    return this.productService.update(+id, updateProductDto, req);
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.productService.remove(+id, req);
  }
}
