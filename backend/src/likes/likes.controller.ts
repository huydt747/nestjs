import { Controller, Get, Post, Delete, Body, Query, Param, NotFoundException } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('post/:postId')
  getLikesByPost(@Param('postId') postId: string) {
    return this.likesService.findByPost(Number(postId));
  }

  @Post()
  create(@Body() body: { userId: number; postId: number }) {
    return this.likesService.create(body);
  }

  @Delete()
  remove(@Query('userId') userId: string, @Query('postId') postId: string) {
    if (!userId || !postId) throw new NotFoundException('userId và postId bắt buộc');
    return this.likesService.remove(Number(userId), Number(postId));
  }
}
