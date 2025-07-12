import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private jwtService: JwtService) {}

  // Hàm kiểm tra xác thực
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // Kiểm tra token có tồn tại không
    if (!token) {
      this.logger.warn('Token không được cung cấp');
      throw new UnauthorizedException('Token không được cung cấp');
    }

    // Xác thực token
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
      this.logger.debug(`User authenticated: ${payload.username}`);
      return true;
    } catch (error) {
      this.logger.warn(
        'Token không hợp lệ',
        error instanceof Error ? error.message : 'Unknown error',
      );
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }

  // Hàm trích xuất token từ header
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
