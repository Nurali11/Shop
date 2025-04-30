import { ApiProperty } from "@nestjs/swagger"

export class CreateMessageDto {
    @ApiProperty({
        name: "fromId",
        description: "fromId ot the messages",
        example: 1
    })
    fromId: number

    @ApiProperty({
        name: "toId",
        description: "toId ot the messages",
        example: 2
    })
    toId: number

    @ApiProperty({
        name: "chatId",
        description: "chatId ot the messages",
        example: 1
    })
    chatId: number

    @ApiProperty({
        name: "text",
        description: "message",
        example: "Hello world!"
    })
    text: string
}
