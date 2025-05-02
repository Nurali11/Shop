import { ApiProperty } from "@nestjs/swagger"

export class ResetDto{
    @ApiProperty({
        name: "old_password",
        example: "hello",
        description: "Old password of the user"
    })
    old_password: string

    @ApiProperty({
        name: "new_password",
        example: "hello12",
        description: "New password of the user"
    })
    new_password: string
}