import { Module } from '@nestjs/common';
import { TaskService } from './task1.service';
import { TaskController } from './task1.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
