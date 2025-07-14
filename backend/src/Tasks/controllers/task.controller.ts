import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task.interface';
import { CreateTaskDto, UpdateTaskDto } from '../dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Lấy tất cả các tasks
  @Get()
  get(): object {
    try {
      return {
        status: 'success',
        message: 'Lấy danh sách tasks thành công',
        data: this.taskService.getAllTasks(),
      };
    } catch (error: any) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi lấy danh sách tasks',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Thêm task mới
  @Post()
  store(@Body() task: CreateTaskDto): object {
    try {
      // Tạo task với ID tự động
      const newTask: Task = {
        id: Date.now(), // Tạo ID tự động
        name: task.name,
        description: task.description,
      };

      return {
        status: 'success',
        message: 'Thêm task thành công',
        data: this.taskService.addTask(newTask),
      };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi thêm task',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Cập nhật task
  @Put(':id')
  update(@Param('id') id: string, @Body() task: UpdateTaskDto): object {
    try {
      const taskId = parseInt(id, 10);
      if (isNaN(taskId)) {
        throw new HttpException(
          {
            status: 'error',
            message: 'ID không hợp lệ',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // Không cần validate thủ công nữa, ValidationPipe sẽ tự xử lý
      return {
        status: 'success',
        message: 'Cập nhật task thành công',
        data: this.taskService.updateTask(taskId, task),
      };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi cập nhật task',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Xóa task
  @Delete(':id')
  delete(@Param('id') id: string): object {
    try {
      const taskId = parseInt(id, 10);
      if (isNaN(taskId)) {
        throw new HttpException(
          {
            status: 'error',
            message: 'ID không hợp lệ',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        status: 'success',
        message: 'Xóa task thành công',
        data: this.taskService.deleteTask(taskId),
      };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi xóa task',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
