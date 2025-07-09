import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Request, Response } from 'express';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

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

  // Thêm middleware csurf, cấu hình lấy token từ cookie
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

  // Middleware để gửi CSRF token về frontend qua header
  app.use((req: Request, res: Response, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken ? req.csrfToken() : '', {
      sameSite: 'lax',
    });
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

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Backend server đang chạy trên: http://localhost:${port}`);
  console.log(`📚 API documentation: http://localhost:${port}/api`);
}
void bootstrap();
