import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderDto {
    @ApiProperty({
        name: "productId",
        example: 1,
        description: "Id of the product"
    })
    productId: number

    @ApiProperty({
        name: "count",
        example: 5,
        description: "Count of the product"
    })
    count: number

    @ApiProperty({
        name: "colorId",
        example: 1,
        description: "Color of the product"
    })
    colorId: number
}
