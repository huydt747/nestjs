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
    const like = this.likeRepo.create(data);
    return this.likeRepo.save(like);
  }

  async remove(id: number) {
    const result = await this.likeRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Không tìm thấy like');
    return { message: 'Bỏ tim thành công' };
  }
}
