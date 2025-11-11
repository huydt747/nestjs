import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAll() {
    return this.commentsService.findAll();
  }

  @Get('post/:postId')
  getByPost(@Param('postId') postId: number) {
    return this.commentsService.findByPost(postId);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.commentsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.commentsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
