import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('post/:id')
  getLikesByPost(@Param('id') id: string) {
    const postId = Number(id);
    return this.likesService.findByPost(postId);
  }
  @Post()
  create(@Body() body: any) {
    return this.likesService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.likesService.remove(id);
  }
}
