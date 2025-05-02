import { ApiProperty } from '@nestjs/swagger';
import { ProductTypes } from '@prisma/client';
import { IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Smartphones',
    description: 'Name of the category',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'URL to the category image',
  })
  @IsUrl()
  photo: string;

  @ApiProperty({
    example: ProductTypes.Phone,
    description: "Type of the product",
  })
  type: ProductTypes
}
