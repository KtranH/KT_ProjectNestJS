import {
  Injectable,
  UnauthorizedException,
  Logger,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { RegisterWithVerificationDto } from '../dto/register-with-verification.dto';
import { SendVerificationDto } from '../dto/send-verification.dto';
import { UserService } from '../../Users/services/user.service';
import { VerificationService } from '../../Verification/verification.service';
import { EmailService } from '../../Email/email.service';
import { JwtPayload, AuthResponse } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private verificationService: VerificationService,
    private emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  //===============================================
  // Hàm đăng nhập
  //===============================================
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    this.logger.debug(`Login attempt for user: ${loginDto.username}`);

    const user = await this.userService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      this.logger.warn(`Failed login attempt for user: ${loginDto.username}`);
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    // Tạo payload cho JWT
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      userId: user.id,
    };

    // Tạo token
    const access_token = this.jwtService.sign(payload);
    this.logger.log(`User logged in successfully: ${user.username}`);

    // Trả về response
    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      },
    };
  }

  //===============================================
  // Hàm xác thực token
  //===============================================
  validateToken(token: string): JwtPayload {
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      this.logger.debug(`Token validated for user: ${payload.username}`);
      return payload;
    } catch (error) {
      this.logger.warn(
        'Token validation failed',
        error instanceof Error ? error.message : 'Unknown error',
      );
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }

  //===============================================
  // Hàm đăng ký
  //===============================================
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Kiểm tra username đã tồn tại chưa
    const existingUser = await this.userService.findByUsername(
      registerDto.username,
    );
    if (existingUser) {
      this.logger.warn(
        `Registration failed - username already exists: ${registerDto.username}`,
      );
      throw new UnauthorizedException('Tên đăng nhập đã tồn tại');
    }

    // Kiểm tra email đã tồn tại chưa
    const existingEmail = await this.userService.findByEmail(registerDto.email);
    if (existingEmail) {
      this.logger.warn(
        `Registration failed - email already exists: ${registerDto.email}`,
      );
      throw new UnauthorizedException('Email đã tồn tại');
    }

    // Tạo user mới
    const newUser = await this.userService.create({
      username: registerDto.username,
      password: registerDto.password,
      fullName: registerDto.fullName,
      email: registerDto.email,
    });

    // Tạo payload cho JWT
    const payload: JwtPayload = {
      username: newUser.username,
      sub: newUser.id,
      userId: newUser.id,
    };

    // Tạo token
    const access_token = this.jwtService.sign(payload);
    this.logger.log(`User registered successfully: ${newUser.username}`);

    // Trả về response
    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour
      user: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    };
  }

  //===============================================
  // Hàm làm mới token
  //===============================================
  async refreshToken(userId: number): Promise<AuthResponse> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User không tồn tại');
    }

    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      userId: user.id,
    };

    const access_token = this.jwtService.sign(payload);

    this.logger.log(`Token refreshed for user: ${user.username}`);

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      },
    };
  }

  //===============================================
  // Hàm gửi mã xác thực email
  //===============================================
  async sendVerificationCode(
    sendVerificationDto: SendVerificationDto,
  ): Promise<{ message: string }> {
    try {
      await this.verificationService.generateVerificationCode(
        sendVerificationDto.email,
      );
      return {
        message:
          'Mã xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.',
      };
    } catch (error) {
      this.logger.error(
        `Failed to send verification code to: ${sendVerificationDto.email}`,
        error,
      );
      throw error;
    }
  }

  //===============================================
  // Hàm gửi lại mã xác thực
  //===============================================
  async resendVerificationCode(
    sendVerificationDto: SendVerificationDto,
  ): Promise<{ message: string }> {
    try {
      await this.verificationService.resendVerificationCode(
        sendVerificationDto.email,
      );
      return {
        message: 'Mã xác thực mới đã được gửi đến email của bạn.',
      };
    } catch (error) {
      this.logger.error(
        `Failed to resend verification code to: ${sendVerificationDto.email}`,
        error,
      );
      throw error;
    }
  }

  //===============================================
  // Hàm đăng ký với xác thực email
  //===============================================
  async registerWithVerification(
    registerDto: RegisterWithVerificationDto,
  ): Promise<AuthResponse> {
    // Kiểm tra username đã tồn tại chưa
    const existingUser = await this.userService.findByUsername(
      registerDto.username,
    );
    if (existingUser) {
      throw new BadRequestException('Tên đăng nhập đã tồn tại');
    }
    // Xác thực mã
    const isValid = await this.verificationService.verifyCode(
      registerDto.email,
      registerDto.verificationCode,
    );
    if (!isValid) {
      throw new BadRequestException('Mã xác thực không đúng hoặc đã hết hạn');
    }

    // Tạo user mới
    const newUser = await this.userService.create({
      username: registerDto.username,
      password: registerDto.password,
      fullName: registerDto.fullName,
      email: registerDto.email,
    });

    // Gửi email chào mừng
    try {
      await this.emailService.sendWelcomeEmail(
        newUser.email!,
        newUser.username,
      );
    } catch (error) {
      this.logger.warn(
        `Failed to send welcome email to: ${newUser.email}`,
        error,
      );
    }

    // Tạo JWT token
    const payload: JwtPayload = {
      username: newUser.username,
      sub: newUser.id,
      userId: newUser.id,
    };

    // Tạo token
    const access_token = this.jwtService.sign(payload);
    this.logger.log(
      `User registered successfully with email verification: ${newUser.username}`,
    );

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    };
  }
}
