import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './Auth/auth.module';
import { TaskModule } from './Tasks/task.module';
import { UserModule } from './Users/user.module';
import { EmailModule } from './Email/email.module';
import { VerificationModule } from './Verification/verification.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { redisConfig } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Cấu hình cache
    CacheModule.register({
      isGlobal: true,
      ttl: 600000, // 10 phút (600000 milliseconds)
      max: 1000, // tối đa 1000 items trong cache
      store: 'memory', // Sử dụng memory store
    }),

    // Cấu hình database
    DatabaseModule,

    // Cấu hình module
    AuthModule,
    UserModule,
    TaskModule,
    EmailModule,
    VerificationModule,

    // Cấu hình Redis
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${redisConfig.host}:${redisConfig.port}`,
      //password: redisConfig.password,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [RedisModule],
})
export class AppModule {}
