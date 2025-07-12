import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { UserService } from './user.service';
import { JwtPayload, AuthResponse } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // Hàm đăng nhập
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

    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      userId: user.id,
    };

    const access_token = this.jwtService.sign(payload);
    this.logger.log(`User logged in successfully: ${user.username}`);

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  // Hàm xác thực token
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

  // Hàm làm mới token
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
      },
    };
  }
}
