import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard, CurrentUser } from '../../Auth';
import { JwtPayload } from '../../Auth/interfaces/jwt-payload.interface';
import {
  UserListResponse,
  UserDetailResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from './interfaces/user.interface';

@ApiTags('Task2 - User Management') // Đánh dấu là API thuộc task2
@Controller('task2') // Đường dẫn API
@UseGuards(JwtAuthGuard) // Sử dụng guard để bắt buộc xác thực JWT
@ApiBearerAuth() // Đánh dấu là API cần xác thực JWT
export class Task2Controller {
  constructor(private readonly userService: UserService) {}

  // Lấy tất cả các users
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả users' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách users thành công',
    type: UserListResponse,
  })
  async get(@CurrentUser() currentUser: JwtPayload): Promise<UserListResponse> {
    const response = await this.userService.getAllUsers();
    response.requestedBy = currentUser.username;
    return response;
  }

  // Lấy thông tin user theo id
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin user theo ID' })
  @ApiParam({ name: 'id', description: 'ID của user' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin user thành công',
    type: UserDetailResponse,
  })
  async getById(
    @Param('id') id: string,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<UserDetailResponse> {
    const response = await this.userService.getUserById(Number(id));
    response.requestedBy = currentUser.username;
    return response;
  }

  // Thêm user
  @Post()
  @ApiOperation({ summary: 'Thêm user mới' })
  @ApiResponse({
    status: 201,
    description: 'Thêm user thành công',
    type: CreateUserResponse,
  })
  async add(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<CreateUserResponse> {
    const response = await this.userService.createUser(createUserDto);
    response.createdBy = currentUser.username;
    return response;
  }

  // Cập nhật user
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật user theo ID' })
  @ApiParam({ name: 'id', description: 'ID của user' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật user thành công',
    type: UpdateUserResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<UpdateUserResponse> {
    const response = await this.userService.updateUser(
      Number(id),
      updateUserDto,
    );
    response.updatedBy = currentUser.username;
    return response;
  }

  // Xóa user
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa user theo ID' })
  @ApiParam({ name: 'id', description: 'ID của user' })
  @ApiResponse({
    status: 200,
    description: 'Xóa user thành công',
    type: DeleteUserResponse,
  })
  async delete(
    @Param('id') id: string,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<DeleteUserResponse> {
    const response = await this.userService.deleteUser(Number(id));
    response.deletedBy = currentUser.username;
    return response;
  }
}
