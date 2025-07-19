import {
  Injectable,
  Logger,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EmailService } from '../Email/email.service';
import { UserService } from '../Users/services/user.service';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  // Tạo mã xác thực
  async generateVerificationCode(email: string): Promise<string> {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    // Tạo mã xác thực 6 số
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Lưu vào cache với thời gian hết hạn 10 phút (600 giây)
    const key = `verification:${email}`;

    try {
      // Lưu mã xác thực vào cache với TTL 10 phút
      await this.cacheManager.set(key, verificationCode, 600000); // 600000ms = 10 phút

      // Verify cache được lưu thành công
      const savedCode = await this.cacheManager.get<string>(key);
      this.logger.log(
        `Cache saved for ${email}: ${savedCode ? 'SUCCESS' : 'FAILED'}`,
      );

      if (!savedCode) {
        throw new Error('Cache save failed');
      }
    } catch (error) {
      this.logger.error(`Error setting cache for ${email}:`, error);
      throw new BadRequestException('Lỗi hệ thống khi tạo mã xác thực');
    }

    // Gửi email xác thực
    await this.emailService.sendVerificationEmail(email, verificationCode);

    this.logger.log(
      `Verification code generated for ${email}: ${verificationCode}`,
    );
    return verificationCode;
  }

  // Xác thực mã xác thực
  async verifyCode(email: string, code: string): Promise<boolean> {
    const key = `verification:${email}`;

    try {
      this.logger.log(`Attempting to verify code for ${email}`);

      const storedCode = await this.cacheManager.get<string>(key);
      this.logger.log(
        `Stored code for ${email}: ${storedCode ? 'EXISTS' : 'NOT_FOUND'}`,
      );

      if (!storedCode) {
        this.logger.warn(`No verification code found for email: ${email}`);
        return false;
      }

      if (storedCode !== code) {
        this.logger.warn(
          `Invalid verification code for email: ${email}. Expected: ${storedCode}, Received: ${code}`,
        );
        return false;
      }

      // Xóa mã sau khi xác thực thành công
      await this.cacheManager.del(key);
      this.logger.log(`Verification successful for email: ${email}`);

      return true;
    } catch (error) {
      this.logger.error(`Error during verification for email: ${email}`, error);
      return false;
    }
  }

  // Gửi lại mã xác thực
  async resendVerificationCode(email: string): Promise<string> {
    // Xóa mã cũ nếu có
    const key = `verification:${email}`;
    await this.cacheManager.del(key);
    this.logger.log(`Resending verification code for ${email}`);
    // Tạo mã mới
    return this.generateVerificationCode(email);
  }

  // Kiểm tra mã xác thực có tồn tại không
  async checkCodeExists(email: string): Promise<boolean> {
    const key = `verification:${email}`;
    const storedCode = await this.cacheManager.get<string>(key);
    const exists = !!storedCode;
    this.logger.log(`Code exists for ${email}: ${exists}`);
    return exists;
  }
}
