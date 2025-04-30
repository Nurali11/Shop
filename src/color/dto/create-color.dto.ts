import { ApiProperty } from "@nestjs/swagger";

export class CreateColorDto {
    @ApiProperty({
        name: "name",
        description: "The name of the color"
    })
    name: string
}