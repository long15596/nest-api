import {ForbiddenException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {AuthDto} from "./dto";
import * as argon from 'argon2'
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,) {
    }

    async register(authDto: AuthDto) {
        let hashedPassword = await argon.hash(authDto.password);
        try {
            let user = await this.prismaService.user.create({
                data: {
                    username: authDto.username,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    username: true,
                    createAt: true
                }
            })
            return {
                user: user
            }
        } catch (err) {
            if (err.code == `P2002`) {
                throw new ForbiddenException("User already exists");
            }
            return err
        }
    }

    async login(authDto: AuthDto) {
        let user = await this.prismaService.user.findUnique({
            where: {username: authDto.username}
        })
        if (!user) {
            throw new ForbiddenException("User does not exist");
        }
        let matchedPassword = await argon.verify(
            user.password,
            authDto.password
        );
        if (!matchedPassword) {
            throw new ForbiddenException("Password does not match");
        }
        return await this.convertToJwt(user.id, user.username);
    }

    convertToJwt = async (userId: string, username: string) => {
        let payload = {
            sub: userId,
            username
        }
        let jwt = await this.jwtService.signAsync(payload, {
            expiresIn: '30m',
            secret: this.configService.get('JWT_SECRET'),
        })
        return {
            Token: jwt
        }
    }
}