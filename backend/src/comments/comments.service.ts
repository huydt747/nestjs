import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  findAll() {
    return this.commentRepo.find({ relations: ['user', 'post'] });
  }

  async findByPost(postId: number) {
    return this.commentRepo.find({
      where: { post: { post_id: postId } },
      relations: ['user', 'post'],
      order: { created_at: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.commentRepo.findOne({ where: { comment_id: id }, relations: ['user', 'post'] });
  }

  async create(data: any) {
    const comment = this.commentRepo.create({
      content: data.content,
      post: { post_id: Number(data.post_id) },
      user: { user_id: Number(data.user_id) },
    });

    const saved = await this.commentRepo.save(comment);
    
    return this.findOne(saved.comment_id);
  }

  async update(id: number, data: Partial<Comment>) {
    await this.commentRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.commentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Không tìm thấy bình luận');
    return { message: 'Xóa bình luận thành công' };
  }
}
