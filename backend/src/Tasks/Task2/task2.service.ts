import { Injectable } from '@nestjs/common';
import { Task2Repository } from './task2.repository';
import { User } from '../../entities/user.entity';
import { UpdateUserRequest, UserRequest } from './tast2.request';

@Injectable()
export class Task2Service {
  constructor(private readonly task2Repository: Task2Repository) {}

  // Lấy tất cả các users
  async getUsers(): Promise<User[]> {
    return await this.task2Repository.findAll();
  }

  // Lấy thông tin user theo id
  async getUserById(id: number): Promise<User | null> {
    return await this.task2Repository.findById(id);
  }

  // Thêm user
  async addUser(user: UserRequest): Promise<User> {
    return await this.task2Repository.addUser(user);
  }

  // Cập nhật user
  async updateUser(id: number, user: UpdateUserRequest): Promise<void> {
    return await this.task2Repository.updateUser(id, user);
  }

  // Xóa user
  async deleteUser(id: number): Promise<void> {
    await this.task2Repository.deleteUser(id);
  }
}
