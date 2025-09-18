import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../admin/admin.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Public endpoints
  @Get()
  findAll(@Query('published') published?: string) {
    const publishedFilter = published === 'true' ? true : published === 'false' ? false : undefined;
    return this.blogService.findAllBlogPosts(publishedFilter);
  }

  @Get('published')
  getPublishedPosts(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    return this.blogService.getPublishedBlogPosts(limitNum);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBlogPostBySlug(slug);
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createBlogPostDto: CreateBlogPostDto, @Request() req) {
    return this.blogService.createBlogPost(createBlogPostDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin')
  findAllAdmin() {
    return this.blogService.findAllBlogPosts();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.blogService.findBlogPostById(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogPostDto: UpdateBlogPostDto) {
    return this.blogService.updateBlogPost(+id, updateBlogPostDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.deleteBlogPost(+id);
  }
}
