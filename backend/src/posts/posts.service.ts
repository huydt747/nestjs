import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like as TypeOrmLike } from 'typeorm';
import { Post } from '../entities/post.entity';
import { instanceToPlain } from 'class-transformer';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  // Lấy tất cả bài viết
  async findAll() {
    const posts = await this.postRepo.find({
      relations: ['user', 'topic', 'comments', 'likes', 'likes.user'],
      order: { created_at: 'DESC' },
    });

    return posts.map(post => this.sanitizePost(post));
  }

  // Lấy 1 bài viết theo id
  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { post_id: id },
      relations: ['user', 'topic', 'comments', 'likes', 'likes.user'],
    });
    return post ? this.sanitizePost(post) : null;
  }

  // Tìm kiếm bài viết theo keyword
  async search(keyword: string) {
    const posts = await this.postRepo.find({
      where: [{ content: TypeOrmLike(`%${keyword}%`) }],
      relations: ['user', 'topic', 'comments', 'likes', 'likes.user'],
      order: { created_at: 'DESC' },
    });

    return posts.map(post => this.sanitizePost(post));
  }

  // Tạo bài viết mới
  async create(data: any) {
    const post = this.postRepo.create({
      content: data.content,
      files: data.files || [],
      user: { user_id: parseInt(data.user_id) },
      topic: { topic_id: parseInt(data.topic_id) },
    });
    const saved = await this.postRepo.save(post);
    return this.sanitizePost(saved);
  }

  // Cập nhật bài viết
  async update(id: number, data: Partial<Post>) {
    await this.postRepo.update(id, data);
    const updated = await this.findOne(id);
    return updated;
  }

  // Xóa bài viết
  async remove(id: number) {
    const result = await this.postRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Không tìm thấy bài viết');
    return { message: 'Xóa bài viết thành công' };
  }

  // Hàm helper loại bỏ dữ liệu nhạy cảm
  private sanitizePost(post: Post) {
    return {
      ...post,
      user: { username: post.user.username },
      likes: post.likes?.map(like => ({
        like_id: like.like_id,
        created_at: like.created_at,
        user: { username: like.user.username },
      })),
      comments: post.comments?.map(comment => ({
        ...comment,
        user: { username: comment.user.username },
      })),
    };
  }
}
