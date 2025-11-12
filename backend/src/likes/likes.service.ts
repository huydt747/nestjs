import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}

  async findByPost(postId: number) {
    return this.likeRepo.find({
      where: { post: { post_id: postId } },
      relations: ['user', 'post'],
    });
  }

  async create(data: Partial<Like>) {
    // Normalize possible JSON-stringified nested entries
    let userId: number | undefined;
    let postId: number | undefined;
    try {
      if (typeof (data as any).user === 'string') (data as any).user = JSON.parse((data as any).user);
    } catch (e) {}
    try {
      if (typeof (data as any).post === 'string') (data as any).post = JSON.parse((data as any).post);
    } catch (e) {}

    userId = (data as any).user?.user_id || (data as any).user_id || undefined;
    postId = (data as any).post?.post_id || (data as any).post_id || undefined;

    if (userId && postId) {
      // If like already exists, return it instead of throwing unique constraint
      const existing = await this.likeRepo.findOne({
        where: { user: { user_id: userId }, post: { post_id: postId } },
        relations: ['user', 'post'],
      });
      if (existing) return existing;
    }

    const like = this.likeRepo.create(data);
    return this.likeRepo.save(like);
  }

  async remove(id: number) {
    const result = await this.likeRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Không tìm thấy like');
    return { message: 'Bỏ tim thành công' };
  }
}
