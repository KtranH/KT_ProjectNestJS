import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Hàm tìm user theo username
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  // Hàm tìm user theo id
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Hàm tạo user
  async createUser(registerDto: RegisterDto): Promise<User> {
    this.logger.debug(`Creating user: ${registerDto.username}`);

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await this.findByUsername(registerDto.username);
    if (existingUser) {
      this.logger.warn(`Username already exists: ${registerDto.username}`);
      throw new ConflictException('Username đã tồn tại');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Tạo user mới
    const user = this.userRepository.create({
      username: registerDto.username,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    this.logger.log(`User created successfully: ${savedUser.username}`);

    return savedUser;
  }

  // Hàm xác thực user
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      this.logger.debug(`User validated: ${username}`);
      return user;
    }

    this.logger.warn(`User validation failed: ${username}`);
    return null;
  }

  // Hàm cập nhật user
  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    // Nếu có password mới, hash nó
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    Object.assign(user, updateData);
    const updatedUser = await this.userRepository.save(user);

    this.logger.log(`User updated: ${updatedUser.username}`);
    return updatedUser;
  }

  // Hàm xóa user
  async deleteUser(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    await this.userRepository.remove(user);
    this.logger.log(`User deleted: ${user.username}`);
  }

  // Hàm lấy tất cả users
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'createdAt', 'updatedAt'], // Không trả về password
    });
  }
}
