import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Hàm lấy tất cả users
  async findAll(): Promise<User[]> {
    this.logger.debug('Fetching all users');
    return await this.userRepository.find({
      select: ['id', 'username', 'createdAt', 'updatedAt'], // Không trả về password
    });
  }

  // Hàm lấy user theo id
  async findById(id: number): Promise<User | null> {
    this.logger.debug(`Fetching user by ID: ${id}`);
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'createdAt', 'updatedAt'],
    });
  }

  // Hàm lấy user theo username
  async findByUsername(username: string): Promise<User | null> {
    this.logger.debug(`Fetching user by username: ${username}`);
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  // Hàm tạo user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug(`Creating user: ${createUserDto.username}`);

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      this.logger.warn(`Username already exists: ${createUserDto.username}`);
      throw new Error('Username đã tồn tại');
    }

    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);

    this.logger.log(`User created successfully: ${savedUser.username}`);
    return savedUser;
  }

  // Hàm cập nhật user
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.debug(`Updating user ID: ${id}`);

    const user = await this.findById(id);
    if (!user) {
      this.logger.warn(`User not found for update: ${id}`);
      throw new NotFoundException('User không tồn tại');
    }

    // Nếu có username mới, kiểm tra xem có trùng không
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findByUsername(updateUserDto.username);
      if (existingUser) {
        this.logger.warn(`Username already exists: ${updateUserDto.username}`);
        throw new Error('Username đã tồn tại');
      }
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    this.logger.log(`User updated successfully: ${updatedUser.username}`);
    return updatedUser;
  }

  // Hàm xóa user
  async deleteUser(id: number): Promise<void> {
    this.logger.debug(`Deleting user ID: ${id}`);

    const user = await this.findById(id);
    if (!user) {
      this.logger.warn(`User not found for deletion: ${id}`);
      throw new NotFoundException('User không tồn tại');
    }

    await this.userRepository.remove(user);
    this.logger.log(`User deleted successfully: ${user.username}`);
  }

  // Hàm đếm số lượng users
  async countUsers(): Promise<number> {
    return await this.userRepository.count();
  }
}
