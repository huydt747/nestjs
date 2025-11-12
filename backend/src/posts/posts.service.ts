import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepo.find({ relations: ['user', 'topic', 'comments', 'likes'] });
  }

  findOne(id: number) {
    return this.postRepo.findOne({
      where: { post_id: id },
      relations: ['user', 'topic', 'comments', 'likes'],
    });
  }

  async search(keyword: string) {
    return this.postRepo.find({
      where: [
        { content: Like(`%${keyword}%`) },
      ],
      relations: ['user', 'topic', 'comments', 'likes'],
      order: { created_at: 'DESC' },
    });
  }

  async create(data: any) {
    const post = this.postRepo.create({
      content: data.content,
      files: data.files || [],
      user: { user_id: parseInt(data.user_id) },
      topic: { topic_id: parseInt(data.topic_id) }
    });
    return this.postRepo.save(post);
  }

  async update(id: number, data: Partial<Post>) {
    await this.postRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.postRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Không tìm thấy bài viết');
    return { message: 'Xóa bài viết thành công' };
  }
}