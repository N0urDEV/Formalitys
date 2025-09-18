import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createBlogPost(createBlogPostDto: CreateBlogPostDto, authorId: number) {
    const slug = this.generateSlug(createBlogPostDto.title);
    
    return this.prisma.blogPost.create({
      data: {
        ...createBlogPostDto,
        slug,
        authorId,
        publishedAt: createBlogPostDto.published ? new Date() : null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAllBlogPosts(published?: boolean) {
    const where = published !== undefined ? { published } : {};
    
    return this.prisma.blogPost.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findBlogPostBySlug(slug: string) {
    return this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findBlogPostById(id: number) {
    return this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updateBlogPost(id: number, updateBlogPostDto: UpdateBlogPostDto) {
    const updateData: any = { ...updateBlogPostDto };
    
    if (updateBlogPostDto.title) {
      updateData.slug = this.generateSlug(updateBlogPostDto.title);
    }
    
    if (updateBlogPostDto.published !== undefined) {
      updateData.publishedAt = updateBlogPostDto.published ? new Date() : null;
    }

    return this.prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async deleteBlogPost(id: number) {
    return this.prisma.blogPost.delete({
      where: { id },
    });
  }

  async getPublishedBlogPosts(limit?: number) {
    return this.prisma.blogPost.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
    });
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }
}
