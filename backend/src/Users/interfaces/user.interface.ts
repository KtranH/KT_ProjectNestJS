import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'ID của user' })
  id: number;

  @ApiProperty({ description: 'Tên đăng nhập' })
  username: string;

  @ApiProperty({ description: 'Họ và tên', required: false })
  fullName?: string;

  @ApiProperty({ description: 'Email', required: false })
  email?: string;

  @ApiProperty({ description: 'Thời gian tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: Date;
}

export class UserListResponse {
  @ApiProperty({ description: 'Trạng thái response' })
  status: string;

  @ApiProperty({ description: 'Thông báo' })
  message: string;

  @ApiProperty({ description: 'Danh sách users', type: [UserResponse] })
  data: UserResponse[];

  @ApiProperty({ description: 'Người yêu cầu' })
  requestedBy: string;
}

export class UserDetailResponse {
  @ApiProperty({ description: 'Trạng thái response' })
  status: string;

  @ApiProperty({ description: 'Thông báo' })
  message: string;

  @ApiProperty({ description: 'Thông tin user', type: UserResponse })
  data: UserResponse | null;

  @ApiProperty({ description: 'Người yêu cầu' })
  requestedBy: string;
}

export class CreateUserResponse {
  @ApiProperty({ description: 'Trạng thái response' })
  status: string;

  @ApiProperty({ description: 'Thông báo' })
  message: string;

  @ApiProperty({ description: 'Thông tin user được tạo', type: UserResponse })
  data: UserResponse;

  @ApiProperty({ description: 'Người tạo' })
  createdBy: string;
}

export class UpdateUserResponse {
  @ApiProperty({ description: 'Trạng thái response' })
  status: string;

  @ApiProperty({ description: 'Thông báo' })
  message: string;

  @ApiProperty({ description: 'Người cập nhật' })
  updatedBy: string;
}

export class DeleteUserResponse {
  @ApiProperty({ description: 'Trạng thái response' })
  status: string;

  @ApiProperty({ description: 'Thông báo' })
  message: string;

  @ApiProperty({ description: 'Người xóa' })
  deletedBy: string;
}
