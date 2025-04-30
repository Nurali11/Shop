import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the product being commented on',
  })
  @IsInt()
  productId: number;

  @ApiProperty({
    example: 5,
    description: 'Rating given by the user (from 1 to 5 stars)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  star: number;

  @ApiProperty({
    example: 'Great product, highly recommend!',
    description: 'Text of the comment left by the user',
  })
  @IsString()
  text: string;
}
