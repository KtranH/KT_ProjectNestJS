import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Task2Service } from './task2.service';
import { UpdateUserRequest, UserRequest } from './tast2.request';

@Controller('task2')
export class Task2Controller {
  constructor(private readonly task2Service: Task2Service) {}

  // Lấy tất cả các users
  @Get()
  async get(): Promise<object> {
    try {
      const user = await this.task2Service.getUsers();
      return {
        status: 'success',
        message: 'Lấy danh sách users thành công',
        data: user,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi lấy danh sách users',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Lấy thông tin user theo id

  @Get(':id')
  async getById(@Param('id') id: string): Promise<object> {
    const user = await this.task2Service.getUserById(Number(id));
    if (user) {
      return {
        status: 'success',
        message: 'Lấy thông tin user thành công',
        data: user,
      };
    } else {
      return {
        status: 'error',
        message: 'Không tìm thấy user',
        data: null,
      };
    }
  }

  // Thêm user
  @Post()
  async add(@Body() user: UserRequest): Promise<object> {
    try {
      const newUser = await this.task2Service.addUser(user);
      return {
        status: 'success',
        message: 'Thêm user thành công',
        data: newUser,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi thêm user',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Cập nhật user
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserRequest,
  ): Promise<object> {
    await this.task2Service.updateUser(Number(id), user);
    return {
      status: 'success',
      message: 'Cập nhật user thành công',
    };
  }

  // Xóa user
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<object> {
    await this.task2Service.deleteUser(Number(id));
    return {
      status: 'success',
      message: 'Xóa user thành công',
    };
  }
}
