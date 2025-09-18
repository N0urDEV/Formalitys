import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<User[]>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    findById(id: number): Promise<User | null>;
}
