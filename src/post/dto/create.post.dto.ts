import {IsNotEmpty, IsString} from "class-validator";

export class PostDto {
    @IsString()
    @IsNotEmpty()
    title: string
    @IsString()
    content: string
    @IsNotEmpty()
    userId: string
}