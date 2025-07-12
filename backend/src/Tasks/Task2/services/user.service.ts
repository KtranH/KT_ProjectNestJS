import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto';
import {
  UserListResponse,
  UserDetailResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from '../interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  // Hàm lấy tất cả users
  async getAllUsers(): Promise<UserListResponse> {
    try {
      this.logger.debug('Getting all users');
      const users = await this.userRepository.findAll();

      return {
        status: 'success',
        message: 'Lấy danh sách users thành công',
        data: users.map((user) => ({
          id: user.id,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })),
        requestedBy: 'system', // Sẽ được cập nhật từ controller
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

  // Hàm lấy user theo id
  async getUserById(id: number): Promise<UserDetailResponse> {
    try {
      this.logger.debug(`Getting user by ID: ${id}`);
      const user = await this.userRepository.findById(id);

      // Nếu không tìm thấy user, trả về lỗi
      if (!user) {
        return {
          status: 'error',
          message: 'Không tìm thấy user',
          data: null,
          requestedBy: 'system',
        };
      }

      // Nếu tìm thấy user, trả về thông tin user
      return {
        status: 'success',
        message: 'Lấy thông tin user thành công',
        data: {
          id: user.id,
          username: user.username,
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

  // Hàm tạo user
  async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    try {
      this.logger.debug(`Creating user: ${createUserDto.username}`);
      const newUser = await this.userRepository.createUser(createUserDto);

      return {
        status: 'success',
        message: 'Thêm user thành công',
        data: {
          id: newUser.id,
          username: newUser.username,
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

  // Hàm cập nhật user
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

  // Hàm xóa user
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

  // Hàm đếm số lượng users
  async getUsersCount(): Promise<number> {
    return await this.userRepository.countUsers();
  }
}
