import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mailConfig from './config/mail.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS để frontend có thể kết nối
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Thêm cookie-parser trước csurf
  app.use(cookieParser());

  // Tạo CSRF middleware với ignore cho các routes authentication
  const csrfMiddleware = csurf({
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
    },
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  });

  // Middleware tùy chỉnh để skip CSRF cho các routes authentication
  app.use((req: Request, res: Response, next: NextFunction) => {
    const authPaths = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/refresh',
      '/api/auth/register-with-verification',
      '/api/auth/send-verification',
      '/api/auth/resend-verification',
      '/api/health',
      '/api/docs',
      '/api/docs-json',
    ];

    const shouldIgnore = authPaths.some((authPath) =>
      req.path.startsWith(authPath),
    );

    if (shouldIgnore) {
      return next();
    }

    return csrfMiddleware(req, res, next);
  });

  // Middleware để gửi CSRF token về frontend qua header
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Chỉ gửi CSRF token cho các routes không bị ignore
    if (req.csrfToken && typeof req.csrfToken === 'function') {
      res.cookie('XSRF-TOKEN', req.csrfToken(), {
        sameSite: 'lax',
      });
    }
    next();
  });

  // Thêm ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Thêm prefix cho tất cả API routes
  app.setGlobalPrefix('api');

  // Setup Swagger Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API documentation cho NestJS project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Backend server đang chạy trên: http://localhost:${port}`);
  console.log(`📚 API documentation: http://localhost:${port}/api/docs`);
  console.log(`📧 Email configured: ${mailConfig.auth.user}`);
}
void bootstrap();
