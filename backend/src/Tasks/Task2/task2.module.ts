import { Module } from '@nestjs/common';
import { Task2Controller } from './task2.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { AuthModule } from '../../Auth';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [Task2Controller],
  providers: [UserService, UserRepository],
})
export class Task2Module {}
