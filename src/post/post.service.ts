import {Body, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {GetUser} from "../auth/decarator/user.decarator";
import {PostDto} from "./dto/create.post.dto";
import {UpdatePostDto} from "./dto/update.post.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) {
    }

    getAll() {
        return this.prismaService.post.findMany()
    }

    getOne(id: string) {
        return this.prismaService.post.findUnique({where: {id}});
    }

    create() {

    }

    update() {
    }
}
