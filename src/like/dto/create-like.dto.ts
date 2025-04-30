import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({
    example: 42,
    description: 'ID продукта, который пользователь хочет лайкнуть',
  })
  @IsInt({ message: 'productId должен быть целым числом' })
  @Min(1, { message: 'productId должен быть больше 0' })
  productId: number;
}

export class DislikeDto {
  @ApiProperty({
    example: 42,
    description: 'ID продукта, с которого нужно удалить лайк',
  })
  @IsInt({ message: 'productId должен быть целым числом' })
  @Min(1, { message: 'productId должен быть больше 0' })
  productId: number;
}
