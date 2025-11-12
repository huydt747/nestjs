import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findByPost(postId: number) {
    const likes = await this.likeRepo.find({
      where: { post: { post_id: postId } },
      relations: ['user'],
    });

    return likes.map((like) => ({
      like_id: like.like_id,
      created_at: like.created_at,
      user: { 
        user_id: like.user.user_id,
        username: like.user.username 
      },
    }));
  }

  async create(data: { userId: number; postId: number }) {
    const user = await this.userRepo.findOneBy({ user_id: data.userId });
    const post = await this.postRepo.findOneBy({ post_id: data.postId });
    if (!user) throw new NotFoundException('User không tồn tại');
    if (!post) throw new NotFoundException('Post không tồn tại');

    const existing = await this.likeRepo.findOne({
      where: { user: { user_id: data.userId }, post: { post_id: data.postId } },
      relations: ['user'], // Thêm relation để có username
    });
    if (existing) {
      return {
        like_id: existing.like_id,
        created_at: existing.created_at,
        user: { 
          user_id: existing.user.user_id,
          username: existing.user.username 
        },
      };
    }

    const like = this.likeRepo.create({ user, post });
    const saved = await this.likeRepo.save(like);
    
    // Trả về dữ liệu từ user đã fetch sẵn thay vì dùng sanitizeLike
    return {
      like_id: saved.like_id,
      created_at: saved.created_at,
      user: { 
        user_id: user.user_id,
        username: user.username 
      },
    };
  }

  async remove(userId: number, postId: number) {
    // Tìm like trước khi xóa
    const like = await this.likeRepo.findOne({
      where: { 
        user: { user_id: userId }, 
        post: { post_id: postId } 
      },
    });

    if (!like) {
      throw new NotFoundException('Like không tồn tại');
    }

    // Xóa bằng entity thay vì delete với điều kiện
    await this.likeRepo.remove(like);
    
    return { message: 'Bỏ tim thành công' };
  }
}