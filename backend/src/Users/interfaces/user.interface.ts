import { ApiProperty } from '@nestjs/swagger';

//===============================================
// Interface cho việc trả về user
//===============================================
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

//===============================================
// Interface cho việc trả về danh sách user
//===============================================
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

//===============================================
// Interface cho việc trả về chi tiết user
//===============================================
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

//===============================================
// Interface cho việc trả về kết quả tạo user
//===============================================
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

//===============================================
// Interface cho việc trả về kết quả cập nhật user
//===============================================
export class UpdateUserResponse {
  @ApiProperty({ description: 'Trạng thái response' })
  status: string;

  @ApiProperty({ description: 'Thông báo' })
  message: string;

  @ApiProperty({ description: 'Người cập nhật' })
  updatedBy: string;
}

//===============================================
// Interface cho việc trả về kết quả xóa user
//===============================================
export class DeleteUserResponse {
  @ApiProperty({ description: 'Trạng thái response' })
  status: string;

  @ApiProperty({ description: 'Thông báo' })
  message: string;

  @ApiProperty({ description: 'Người xóa' })
  deletedBy: string;
}
