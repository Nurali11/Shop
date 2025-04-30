import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  create(createOrderDto: CreateOrderDto) {
    try {
      
    } catch (error) {
      return {message: error.message}
    }
  }

  findAll() {
    try {
      
    } catch (error) {
      return {message: error.message}
    }
  }

  findOne(id: number) {
    try {
      
    } catch (error) {
      return {message: error.message}
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      
    } catch (error) {
      return {message: error.message}
    }
  }

  remove(id: number) {
    try {
      
    } catch (error) {
      return {message: error.message}
    }
  }
}
