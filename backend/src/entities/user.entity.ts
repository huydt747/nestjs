import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true, length: 50 })
  @Expose() // Chỉ expose username
  username: string;

  @Column({ length: 255 })
  // Không expose password
  password_hash: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  // Không expose role
  role: 'user' | 'admin';

  @CreateDateColumn()
  // Không expose created_at
  created_at: Date;

  // Quan hệ 1-n với Post
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // Quan hệ 1-n với Comment
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // Quan hệ 1-n với Like
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
