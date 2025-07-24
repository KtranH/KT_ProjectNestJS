import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//===============================================
// DTO cho việc đăng nhập
//===============================================
export class LoginDto {
  @ApiProperty({
    description: 'Tên đăng nhập',
    example: 'admin',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Username không được để trống' })
  @IsString({ message: 'Username phải là chuỗi' })
  @MinLength(3, { message: 'Username phải có ít nhất 3 ký tự' })
  @MaxLength(50, { message: 'Username không được quá 50 ký tự' })
  username: string;

  @ApiProperty({
    description: 'Mật khẩu',
    example: 'password123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password không được để trống' })
  @IsString({ message: 'Password phải là chuỗi' })
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
  password: string;
}
