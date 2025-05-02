import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProductTypes, Status } from '@prisma/client';
import { Type } from 'class-transformer';

export class ProductQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ProductTypes })
  @IsOptional()
  @IsEnum(ProductTypes)
  type?: ProductTypes;

  @ApiPropertyOptional({ enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Page number (starts from 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @ApiPropertyOptional({  description: 'Items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;
}
