import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//===============================================
// DTO cho việc gửi mã xác thực
//===============================================
export class SendVerificationDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email để gửi mã xác thực',
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
}
