import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../entities/like.entity';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Post, User]), // <-- thêm Post và User
  ],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
