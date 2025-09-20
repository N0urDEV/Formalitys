"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    const envOrigins = (process.env.CORS_ORIGINS || '')
        .split(',')
        .map((o) => o.trim())
        .filter((o) => o.length > 0);
    const defaultLocalOrigins = [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/];
    const parsedEnvOrigins = envOrigins.map((origin) => {
        if (origin.includes('*')) {
            const escaped = origin
                .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
                .replace(/\\\*/g, '.*');
            return new RegExp(`^${escaped}$`);
        }
        return origin;
    });
    const corsOrigins = [...defaultLocalOrigins, ...parsedEnvOrigins];
    app.enableCors({
        origin: corsOrigins.length > 0 ? corsOrigins : defaultLocalOrigins,
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map