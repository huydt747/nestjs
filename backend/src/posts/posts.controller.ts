import {
  Body,
  Controller,
  Delete,
  Get,
  Post as HttpPost,
  Param,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Get('search/:keyword')
  search(@Param('keyword') keyword: string) {
    return this.postsService.search(keyword);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @HttpPost()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = './uploads/posts';
          try {
            if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
          } catch (err) {
            // ignore mkdir errors here; multer will bubble up if needed
          }
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const name = `${Date.now()}-${file.originalname}`.replace(/\s+/g, '-');
          cb(null, name);
        },
      }),
      limits: { fileSize: 20 * 1024 * 1024 }, // 20MB per file limit
    }),
  )
  async create(@UploadedFiles() files: any[], @Body() body: any) {
    const fileMetas = (files || []).map((f: any) => ({
      filename: f.filename || f.originalname,
      originalname: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
      path: (f as any).path || `uploads/posts/${f.filename || f.originalname}`,
    }));

    const payload = { ...body, files: fileMetas };
    return this.postsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}