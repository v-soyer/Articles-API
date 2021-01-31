import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ArticleCreateDto {
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        title: string;

        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        content: string;

        @ApiProperty()
        @IsArray()
        tags: Array<string>;
}
