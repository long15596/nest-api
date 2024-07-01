import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import {PostDto} from "./dto/create.post.dto";
import {JwtGuard} from "../auth/guard";
import {GetUser} from "../auth/decarator/user.decarator";
import {UpdatePostDto} from "./dto/update.post.dto";

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @Get()
    getAllByUser(@GetUser('id') userId: string) {
        return this.postService.getAll(userId)
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.postService.getOne(id)
    }

    @Post()
    async create(
        @GetUser('id') userId: string,
        @Body() data: PostDto) {
         return this.postService.create(userId, data);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() data: UpdatePostDto) {
        return this.postService.update(id, data);
    }
}
