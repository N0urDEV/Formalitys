import { AuthService } from './auth.service';
declare class RegisterDto {
    name?: string;
    email: string;
    phone?: string;
    password: string;
}
declare class LoginDto {
    emailOrPhone: string;
    password: string;
}
declare class ForgotPasswordDto {
    email: string;
}
declare class ResetPasswordDto {
    token: string;
    password: string;
}
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: any;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: any;
    }>;
    profile(req: any): Promise<any>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
        resetUrl?: undefined;
    } | {
        message: string;
        resetUrl: string | undefined;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyResetToken(token: string): Promise<{
        valid: boolean;
        email: string;
    }>;
    checkEmail(body: {
        email: string;
    }): Promise<{
        message: string;
        email: string;
    }>;
    resetPasswordDirect(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
}
export {};
