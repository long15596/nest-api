import {Body, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {GetUser} from "../auth/decarator/user.decarator";
import {PostDto} from "./dto/create.post.dto";
import {UpdatePostDto} from "./dto/update.post.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) {
    }

    getAll(userId: string) {
        return !userId
            ? this.prismaService.post.findMany()
            : this.prismaService.post.findMany({where: {userId}})
    }

    getOne(id: string) {
        return this.prismaService.post.findUnique({where: {id}});
    }

    async create(userId: string, data: PostDto) {
        let post = await this.prismaService.post.create({
            data: {...data, userId: userId}
        })
        return post
    }

    async update(postId: string, data: UpdatePostDto) {
        let post = await this.prismaService.post.update({where: {id: postId}, data: data});
        return post
    }
}
