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
import { RegisterWithVerificationDto } from '../dto/register-with-verification.dto';
import { SendVerificationDto } from '../dto/send-verification.dto';
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
        access_token: { type: 'string' },
        token_type: { type: 'string' },
        expires_in: { type: 'number' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            username: { type: 'string' },
            fullName: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Username hoặc email đã tồn tại' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    try {
      return await this.authService.register(registerDto);
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
  async getProfile(@CurrentUser() user: JwtPayload): Promise<UserProfile> {
    const userProfile = await this.userService.getUserById(user.userId);
    if (userProfile.status === 'success' && userProfile.data) {
      return {
        id: userProfile.data.id,
        username: userProfile.data.username,
        fullName: (userProfile.data.fullName as string) || '',
        email: (userProfile.data.email as string) || '',
        createdAt: userProfile.data.createdAt,
        updatedAt: userProfile.data.updatedAt,
      };
    }
    return {
      id: user.userId,
      username: user.username,
      fullName: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
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

  // Gửi mã xác thực email
  @Post('send-verification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gửi mã xác thực email' })
  @ApiResponse({
    status: 200,
    description: 'Mã xác thực đã được gửi',
    schema: {
      example: {
        message:
          'Mã xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email không hợp lệ hoặc đã được sử dụng',
  })
  async sendVerificationCode(@Body() sendVerificationDto: SendVerificationDto) {
    return this.authService.sendVerificationCode(sendVerificationDto);
  }

  // Gửi lại mã xác thực
  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gửi lại mã xác thực email' })
  @ApiResponse({
    status: 200,
    description: 'Mã xác thực mới đã được gửi',
    schema: {
      example: {
        message: 'Mã xác thực mới đã được gửi đến email của bạn.',
      },
    },
  })
  async resendVerificationCode(
    @Body() sendVerificationDto: SendVerificationDto,
  ) {
    return this.authService.resendVerificationCode(sendVerificationDto);
  }

  // Đăng ký với xác thực email
  @Post('register-with-verification')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đăng ký tài khoản với xác thực email' })
  @ApiResponse({
    status: 201,
    description: 'Đăng ký thành công',
    schema: {
      example: {
        access_token: 'jwt-token-here',
        token_type: 'Bearer',
        expires_in: 3600,
        user: {
          id: 1,
          username: 'johndoe',
          fullName: 'John Doe',
          email: 'john@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ hoặc mã xác thực không đúng',
  })
  async registerWithVerification(
    @Body() registerDto: RegisterWithVerificationDto,
  ): Promise<AuthResponse> {
    return this.authService.registerWithVerification(registerDto);
  }
}
