import { Module } from '@nestjs/common';
import { Task2Service } from './task2.service';
import { Task2Controller } from './task2.controller';
import { Task2Repository } from './task2.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [Task2Controller],
  providers: [Task2Service, Task2Repository],
})
export class Task2Module {}
