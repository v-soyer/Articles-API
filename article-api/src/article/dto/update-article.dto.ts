import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ArticleUpdateDto {
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        title: string;

        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        content: string;
}
