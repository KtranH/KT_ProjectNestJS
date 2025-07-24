import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//===============================================
// DTO cho việc cập nhật user
//===============================================
export class UpdateUserDto {
  @ApiProperty({
    description: 'Tên đăng nhập',
    example: 'updateduser',
    minLength: 3,
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Username phải là chuỗi' })
  @MinLength(3, { message: 'Username phải có ít nhất 3 ký tự' })
  @MaxLength(50, { message: 'Username không được quá 50 ký tự' })
  username?: string;

  @ApiProperty({
    description: 'Mật khẩu',
    example: 'newpassword123',
    minLength: 6,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Password phải là chuỗi' })
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
  password?: string;

  @ApiProperty({
    description: 'Họ và tên',
    example: 'Nguyễn Văn A',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Họ và tên phải là chuỗi' })
  @MaxLength(255, { message: 'Họ và tên không được quá 255 ký tự' })
  fullName?: string;

  @ApiProperty({
    description: 'Email',
    example: 'updated@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;
}
