import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ViewsService } from 'src/views/views.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ViewsService],
})
export class ProductModule {}
