import { ApiProperty } from "@nestjs/swagger"

export class CreateChatDto {
    @ApiProperty({
        name: "toId",
        description: "id of the user"
    })
    toId: number
}