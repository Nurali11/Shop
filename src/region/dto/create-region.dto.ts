import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto {
    @ApiProperty({
        name: "name",
        description: "name of the region"
    })
    name: string
}
