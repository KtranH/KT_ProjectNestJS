import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../Users/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import {
  JwtPayload,
  AuthResponse,
  UserProfile,
} from '../interfaces/jwt-payload.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // Hàm đăng nhập
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập user' })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        token_type: { type: 'string' },
        expires_in: { type: 'number' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            username: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Thông tin đăng nhập không chính xác',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Hàm đăng ký
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đăng ký user mới' })
  @ApiResponse({
    status: 201,
    description: 'Đăng ký thành công',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            username: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Username đã tồn tại' })
  async register(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.userService.createUser(registerDto);
      return {
        message: 'Đăng ký thành công',
        user: {
          id: user.data.id,
          username: user.data.username,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  // Hàm lấy thông tin profile
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin profile của user hiện tại' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin profile',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        username: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@CurrentUser() user: JwtPayload): UserProfile {
    return {
      id: user.userId,
      username: user.username,
    };
  }

  // Hàm làm mới token
  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh JWT token' })
  @ApiResponse({
    status: 200,
    description: 'Token được refresh thành công',
  })
  async refreshToken(@CurrentUser() user: JwtPayload): Promise<AuthResponse> {
    return await this.authService.refreshToken(user.userId);
  }

  // Hàm lấy danh sách users
  @Get('users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách tất cả users (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách users',
  })
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return {
      status: 'success',
      message: 'Lấy danh sách users thành công',
      data: users.data,
    };
  }
}
