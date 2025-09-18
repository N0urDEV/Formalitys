export declare class EmailService {
    private transporter;
    constructor();
    sendPasswordResetEmail(email: string, resetUrl: string, userName?: string): Promise<{
        success: boolean;
        messageId: any;
    }>;
    sendWelcomeEmail(email: string, userName?: string): Promise<{
        success: boolean;
        messageId: any;
    }>;
    private getPasswordResetTemplate;
    private getWelcomeTemplate;
}
