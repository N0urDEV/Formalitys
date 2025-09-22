"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const s3_service_1 = require("../s3/s3.service");
let BlogService = class BlogService {
    prisma;
    s3Service;
    constructor(prisma, s3Service) {
        this.prisma = prisma;
        this.s3Service = s3Service;
    }
    async createBlogPost(createBlogPostDto, authorId) {
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
    async findAllBlogPosts(published) {
        const where = published !== undefined ? { published } : {};
        const blogPosts = await this.prisma.blogPost.findMany({
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
        return Promise.all(blogPosts.map(post => this.processBlogPost(post)));
    }
    async findBlogPostBySlug(slug) {
        const blogPost = await this.prisma.blogPost.findUnique({
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
        if (!blogPost)
            return null;
        return this.processBlogPost(blogPost);
    }
    async findBlogPostById(id) {
        const blogPost = await this.prisma.blogPost.findUnique({
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
        if (!blogPost)
            return null;
        return this.processBlogPost(blogPost);
    }
    async updateBlogPost(id, updateBlogPostDto) {
        const updateData = { ...updateBlogPostDto };
        if (updateBlogPostDto.title) {
            updateData.slug = this.generateSlug(updateBlogPostDto.title);
        }
        if (updateBlogPostDto.published !== undefined) {
            updateData.publishedAt = updateBlogPostDto.published ? new Date() : null;
        }
        const blogPost = await this.prisma.blogPost.update({
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
        return this.processBlogPost(blogPost);
    }
    async deleteBlogPost(id) {
        return this.prisma.blogPost.delete({
            where: { id },
        });
    }
    async getPublishedBlogPosts(limit) {
        const blogPosts = await this.prisma.blogPost.findMany({
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
        return Promise.all(blogPosts.map(post => this.processBlogPost(post)));
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    async convertS3UrlToSignedUrl(url) {
        if (!url)
            return null;
        console.log('Converting S3 URL to signed URL:', url);
        const s3Endpoint = process.env.S3_ENDPOINT;
        const bucketName = process.env.S3_BUCKET_NAME || 'formalitys-uploads';
        console.log('S3 Config:', { s3Endpoint, bucketName });
        if (url.includes(`${s3Endpoint}/${bucketName}/`)) {
            const key = url.replace(`${s3Endpoint}/${bucketName}/`, '');
            console.log('Extracted S3 key:', key);
            try {
                const signedUrl = await this.s3Service.getSignedUrl(key, 3600);
                console.log('Generated signed URL:', signedUrl);
                return signedUrl;
            }
            catch (error) {
                console.error('Error generating signed URL:', error);
                return url;
            }
        }
        console.log('URL is not an S3 URL, returning original');
        return url;
    }
    async processBlogPost(blogPost) {
        if (blogPost.featuredImage) {
            blogPost.featuredImage = await this.convertS3UrlToSignedUrl(blogPost.featuredImage);
        }
        return blogPost;
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        s3_service_1.S3Service])
], BlogService);
//# sourceMappingURL=blog.service.js.map