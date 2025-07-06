import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Lấy tất cả các tasks
  @Get()
  get(): object {
    return {
      status: 'success',
      message: 'Lấy danh sách tasks thành công',
      data: this.taskService.getAllTasks(),
    };
  }

  // Thêm task mới
  @Post()
  store(@Body() task: Task): object {
    return {
      status: 'success',
      message: 'Thêm task thành công',
      data: this.taskService.addTask(task),
    };
  }

  // Cập nhật task
  @Put(':id')
  update(@Param('id') id: number, @Body() task: Task): object {
    return {
      status: 'success',
      message: 'Cập nhật task thành công',
      data: this.taskService.updateTask(id, task),
    };
  }

  // Xóa task
  @Delete(':id')
  delete(@Param('id') id: number): object {
    return {
      status: 'success',
      message: 'Xóa task thành công',
      data: this.taskService.deleteTask(id),
    };
  }
}
