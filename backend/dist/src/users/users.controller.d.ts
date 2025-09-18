import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}
