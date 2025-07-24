import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthModule } from '../Auth';
import { RedisModule } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { redisConfig } from '../config/redis.config';

@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: redisConfig.host,
          port: redisConfig.port,
        });
      },
    },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
