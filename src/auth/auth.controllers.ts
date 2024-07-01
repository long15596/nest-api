import {
    Body,
    Controller,
    Post,
    Req
} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("register")
    register(@Body() data: AuthDto) {
        return this.authService.register(data)
    }

    @Post("login")
    login(@Body() data: AuthDto) {
        return this.authService.login(data)
    }
}