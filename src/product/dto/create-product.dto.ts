import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEnum, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { ProductTypes, Status } from '@prisma/client';

export class CreateProductDto {
  @ApiProperty({
    example: 'iPhone 16',
    description: 'The name of the product',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 999,
    description: 'The price of the product in USD',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 1,
    description: 'Category ID for the product',
  })
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: 10.5,
    description: 'Discount percentage for the product',
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  skidka: number;

  @ApiProperty({
    example: "Musor tokish uchun qulay! Hokandoz",
    description: 'Detailed description of the product',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 50,
    description: 'Count of the product',
  })
  @IsInt()
  @Min(0)
  count: number;

  @ApiProperty({
    name: "color",
    example: [1],
    description: "Color of the product"
  })
  colors: number[]

  @ApiProperty({
    enum: ProductTypes,
    example: ProductTypes.Phone,
    description: 'The type of the product (Phone, Electronics, Laptops, Accessories)',
  })
  @IsEnum(ProductTypes)
  type: ProductTypes;

  @ApiProperty({
    enum: Status,
    example: Status.New,
    description: 'The condition of the product (New, Used)',
  })
  @IsEnum(Status)
  status: Status;
}
