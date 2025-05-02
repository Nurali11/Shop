import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';
import { RoleD } from 'src/roles/decorators/role.decorator';
import { CheckGuard } from 'src/auth/check.jwt.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.orderService.create(createOrderDto, req);
  }

  @ApiQuery({
    name: "productId",
    required: false
  })
  @ApiQuery({
    name: "userId",
    required: false
  })
  @Get()
  findAll(@Query("productId") productId: number, @Query("userId") userId: number) {
    return this.orderService.findAll(productId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Req() req: Request) {
    return this.orderService.update(+id, updateOrderDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.orderService.remove(+id, req);
  }
}
