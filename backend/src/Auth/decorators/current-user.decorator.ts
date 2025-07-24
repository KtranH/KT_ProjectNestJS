import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

//===============================================
// Decorator (Decorator là nơi để định nghĩa các thuộc tính của một class)
// cho việc lấy thông tin user hiện tại
//===============================================
export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request['user'] as JwtPayload;

    // Nếu có data parameter, trả về property cụ thể
    // Nếu không có data parameter, trả về toàn bộ user
    return data ? user?.[data] : user;
  },
);
