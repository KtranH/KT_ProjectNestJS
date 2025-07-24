import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

//===============================================
// DTO cho việc cập nhật task
//===============================================
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
