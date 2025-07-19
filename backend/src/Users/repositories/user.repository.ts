import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Hàm lấy tất cả users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'username', 'fullName', 'email', 'createdAt', 'updatedAt'], // Không trả về password
    });
  }

  // Hàm lấy user theo id
  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'fullName', 'email', 'createdAt', 'updatedAt'],
    });
  }

  // Hàm lấy user theo username
  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  // Hàm lấy user theo email
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  // Hàm tạo user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Kiểm tra username đã tồn tại chưa
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new Error('Username đã tồn tại');
    }

    // Mã hóa mật khẩu
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  // Hàm cập nhật user
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    // Nếu có username mới, kiểm tra xem có trùng không
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findByUsername(updateUserDto.username);
      if (existingUser) {
        throw new Error('Username đã tồn tại');
      }
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }

  // Hàm xóa user
  async deleteUser(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }
    await this.userRepository.remove(user);
  }

  // Hàm đếm số lượng users
  async countUsers(): Promise<number> {
    return await this.userRepository.count();
  }

  // Hàm xác thực user (dùng cho Auth)
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && user.password) {
      const bcrypt = await import('bcrypt');
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
    }
    return null;
  }
}
