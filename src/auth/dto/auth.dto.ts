import {IsNotEmpty} from "class-validator";

export class AuthDto {
    @IsNotEmpty({message: 'Không được để trống'})
    username: string;
    @IsNotEmpty()
    password: string;
}