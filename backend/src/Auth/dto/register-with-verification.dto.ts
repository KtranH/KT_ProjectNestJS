import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//===============================================
// DTO cho việc đăng ký với xác thực email
//===============================================
export class RegisterWithVerificationDto {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @IsNotEmpty({ message: 'Username không được để trống' })
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Mã xác thực 6 số được gửi qua email',
  })
  @IsString()
  @Length(6, 6, { message: 'Mã xác thực phải có đúng 6 số' })
  @IsNotEmpty({ message: 'Mã xác thực không được để trống' })
  verificationCode: string;
}
