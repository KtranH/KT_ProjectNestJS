import { IsNotEmpty, IsString } from 'class-validator';

//===============================================
// DTO cho việc tạo task
//===============================================
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
