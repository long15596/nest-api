import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {Request} from "express";
import {JwtGuard} from "../auth/guard";
import {GetUser} from "../auth/decarator/user.decarator";
import {User} from "@prisma/client";

@Controller('user')
export class UserController {
    @UseGuards(JwtGuard)
    @Get(`profile`)
    profile(@GetUser() user: User) {
        return user
    }
}
