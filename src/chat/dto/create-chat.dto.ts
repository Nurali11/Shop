import { ApiProperty } from "@nestjs/swagger"

export class CreateChatDto {
    @ApiProperty({
        name: "fromId",
        description: "id of the user"
    })
    fromId: number

    @ApiProperty({
        name: "toId",
        description: "id of the user"
    })
    toId: number
}