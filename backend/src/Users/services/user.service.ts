import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto';
import {
  UserListResponse,
  UserDetailResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from '../interfaces/user.interface';

import { Redis } from 'ioredis';

// Định nghĩa kiểu UserType chuẩn
interface UserType {
  id: number;
  username: string;
  fullName?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Hàm kiểm tra user có đúng kiểu UserType không
function isUserType(user: UserType): user is UserType {
  return (
    user &&
    typeof user === 'object' &&
    typeof user.id === 'number' &&
    typeof user.username === 'string' &&
    (user.createdAt instanceof Date || typeof user.createdAt === 'string') &&
    (user.updatedAt instanceof Date || typeof user.updatedAt === 'string')
  );
}

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  //===============================================
  // Hàm lấy tất cả users
  //===============================================
  async getAllUsers(): Promise<UserListResponse> {
    try {
      this.logger.debug('Getting all users');

      let users: UserType[] = [];
      // Kiểm tra xem có dữ liệu trong Redis không
      const cachedUsers = await this.redisClient.get('AllUsers');
      if (cachedUsers) {
        users = JSON.parse(cachedUsers) as UserType[];
        this.logger.debug('Đã lấy dữ liệu từ Redis');
      } else {
        // Nếu không có dữ liệu trong Redis, lấy từ database
        users = (await this.userRepository.findAll()) as UserType[];
        const plainUsers = users.map((user) => ({
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }));
        // Cache vào Redis
        await this.redisClient.set('AllUsers', JSON.stringify(plainUsers));
        this.logger.debug('Đã cache vào Redis');
      }

      // Lọc các user không hợp lệ
      const safeUsers: UserType[] = users
        .map((user: UserType) => {
          if (user && typeof user === 'object') {
            if (typeof user.createdAt === 'string') {
              user.createdAt = new Date(user.createdAt);
            }
            if (typeof user.updatedAt === 'string') {
              user.updatedAt = new Date(user.updatedAt);
            }
          }
          return user;
        })
        .filter(isUserType);
      return {
        status: 'success',
        message: 'Lấy danh sách users thành công',
        data: safeUsers.map((user) => ({
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })),
        requestedBy: 'system',
      };
    } catch (error) {
      this.logger.error('Error getting all users', error);
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

  //===============================================
  // Hàm lấy user theo id
  //===============================================
  async getUserById(id: number): Promise<UserDetailResponse> {
    try {
      // Lấy dữ liệu từ database
      const rawUser = (await this.userRepository.findById(id)) as UserType;
      let user: UserType | null = null;
      if (rawUser && typeof rawUser === 'object') {
        if (typeof rawUser.createdAt === 'string') {
          rawUser.createdAt = new Date(rawUser.createdAt);
        }
        if (typeof rawUser.updatedAt === 'string') {
          rawUser.updatedAt = new Date(rawUser.updatedAt);
        }
        if (isUserType(rawUser)) user = rawUser;
      }
      if (!user) {
        return {
          status: 'error',
          message: 'Không tìm thấy user',
          data: null,
          requestedBy: 'system',
        };
      }
      return {
        status: 'success',
        message: 'Lấy thông tin user thành công',
        data: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        requestedBy: 'system',
      };
    } catch (error) {
      this.logger.error(`Error getting user by ID: ${id}`, error);
      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi lấy thông tin user',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //===============================================
  // Hàm tạo user
  //===============================================
  async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    try {
      this.logger.debug(`Creating user: ${createUserDto.username}`);
      const newUser = (await this.userRepository.createUser(
        createUserDto,
      )) as UserType;

      return {
        status: 'success',
        message: 'Thêm user thành công',
        data: {
          id: newUser.id,
          username: newUser.username,
          fullName: newUser.fullName,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
        createdBy: 'system',
      };
    } catch (error) {
      this.logger.error(
        `Error creating user: ${createUserDto.username}`,
        error,
      );

      if (error instanceof Error && error.message === 'Username đã tồn tại') {
        throw new HttpException(
          {
            status: 'error',
            message: 'Username đã tồn tại',
          },
          HttpStatus.CONFLICT,
        );
      }

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

  //===============================================
  // Hàm tìm user theo email
  //===============================================
  async findByEmail(email: string): Promise<UserType | null> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      this.logger.error(`Error finding user by email: ${email}`, error);
      return null;
    }
  }

  //===============================================
  // Hàm tạo user (internal)
  //===============================================
  async create(createUserDto: CreateUserDto): Promise<UserType> {
    try {
      this.logger.debug(`Creating user: ${createUserDto.username}`);
      const newUser = (await this.userRepository.createUser(
        createUserDto,
      )) as UserType;

      return newUser;
    } catch (error) {
      this.logger.error(
        `Error creating user: ${createUserDto.username}`,
        error,
      );

      if (error instanceof Error && error.message === 'Username đã tồn tại') {
        throw new HttpException(
          {
            status: 'error',
            message: 'Username đã tồn tại',
          },
          HttpStatus.CONFLICT,
        );
      }

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

  //===============================================
  // Hàm cập nhật user
  //===============================================
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    try {
      this.logger.debug(`Updating user ID: ${id}`);
      await this.userRepository.updateUser(id, updateUserDto);

      return {
        status: 'success',
        message: 'Cập nhật user thành công',
        updatedBy: 'system',
      };
    } catch (error) {
      this.logger.error(`Error updating user ID: ${id}`, error);

      if (error instanceof Error && error.message === 'Username đã tồn tại') {
        throw new HttpException(
          {
            status: 'error',
            message: 'Username đã tồn tại',
          },
          HttpStatus.CONFLICT,
        );
      }

      if (error instanceof Error && error.message === 'User không tồn tại') {
        throw new HttpException(
          {
            status: 'error',
            message: 'User không tồn tại',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi cập nhật user',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //===============================================
  // Hàm xóa user
  //===============================================
  async deleteUser(id: number): Promise<DeleteUserResponse> {
    try {
      this.logger.debug(`Deleting user ID: ${id}`);
      await this.userRepository.deleteUser(id);

      return {
        status: 'success',
        message: 'Xóa user thành công',
        deletedBy: 'system',
      };
    } catch (error) {
      this.logger.error(`Error deleting user ID: ${id}`, error);

      if (error instanceof Error && error.message === 'User không tồn tại') {
        throw new HttpException(
          {
            status: 'error',
            message: 'User không tồn tại',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          message: 'Lỗi khi xóa user',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //===============================================
  // Hàm đếm số lượng users
  //===============================================
  async getUsersCount(): Promise<number> {
    return await this.userRepository.countUsers();
  }

  //===============================================
  // Hàm tìm user theo username (dùng cho Auth)
  //===============================================
  async findByUsername(username: string): Promise<UserType | null> {
    return this.userRepository.findByUsername(username);
  }

  //===============================================
  // Hàm tìm user theo id (dùng cho Auth)
  //===============================================
  async findById(id: number): Promise<UserType | null> {
    return this.userRepository.findById(id);
  }

  //===============================================
  // Hàm xác thực user (dùng cho Auth)
  //===============================================
  async validateUser(
    username: string,
    password: string,
  ): Promise<UserType | null> {
    return this.userRepository.validateUser(username, password);
  }
}
