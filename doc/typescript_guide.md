## TypeScript trong NestJS

### Giới thiệu TypeScript

TypeScript là ngôn ngữ lập trình được phát triển bởi Microsoft, là superset của JavaScript với thêm static typing. NestJS được viết hoàn toàn bằng TypeScript và khuyến khích sử dụng TypeScript để có type safety tốt hơn.

### Cài đặt và cấu hình TypeScript

#### 1. Cài đặt TypeScript

```bash
npm install -g typescript
npm install --save-dev @types/node @types/express
```

#### 2. Cấu hình tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2020",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@/*": ["src/*"],
      "@/config/*": ["src/config/*"],
      "@/entities/*": ["src/entities/*"],
      "@/dto/*": ["src/dto/*"]
    }
  }
}
```

### Các khái niệm TypeScript cơ bản trong NestJS

#### 1. Types và Interfaces

```typescript
// src/types/user.types.ts

// Basic types
type UserRole = 'admin' | 'user' | 'moderator';
type UserStatus = 'active' | 'inactive' | 'pending';

// Interface cho User
interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Interface cho Create User
interface ICreateUser {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

// Interface cho Update User
interface IUpdateUser {
  email?: string;
  name?: string;
  role?: UserRole;
  status?: UserStatus;
}

// Generic interface cho API response
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  timestamp: Date;
}

// Interface cho pagination
interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
```

#### 2. Enums

```typescript
// src/enums/user.enum.ts

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

// Enum cho HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
```

#### 3. Generics

```typescript
// src/interfaces/base.interface.ts

// Base interface cho entities
export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Generic service interface
export interface IBaseService<T extends IBaseEntity, CreateDto, UpdateDto> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(createDto: CreateDto): Promise<T>;
  update(id: string, updateDto: UpdateDto): Promise<T>;
  remove(id: string): Promise<void>;
}

// Generic repository interface
export interface IBaseRepository<T> {
  find(options?: any): Promise<T[]>;
  findOne(options: any): Promise<T | null>;
  create(data: Partial<T>): T;
  save(entity: T): Promise<T>;
  remove(entity: T): Promise<T>;
}

// Generic controller interface
export interface IBaseController<T, CreateDto, UpdateDto> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(createDto: CreateDto): Promise<T>;
  update(id: string, updateDto: UpdateDto): Promise<T>;
  remove(id: string): Promise<void>;
}
```

#### 4. Utility Types

```typescript
// src/types/utility.types.ts

import { IUser, ICreateUser, IUpdateUser } from './user.types';

// Partial - làm tất cả properties optional
type PartialUser = Partial<IUser>;

// Pick - chọn một số properties
type UserBasicInfo = Pick<IUser, 'id' | 'name' | 'email'>;

// Omit - loại bỏ một số properties
type UserWithoutPassword = Omit<IUser, 'password'>;

// Required - làm tất cả properties required
type RequiredUser = Required<ICreateUser>;

// Record - tạo object type với key và value types
type UserRoles = Record<string, UserRole>;

// ReturnType - lấy return type của function
type ServiceReturnType = ReturnType<typeof UserService.prototype.findAll>;

// Parameters - lấy parameter types của function
type CreateUserParams = Parameters<typeof UserService.prototype.create>;
```

### Advanced TypeScript Features trong NestJS

#### 1. Decorators

```typescript
// src/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator để lấy current user
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

// Custom decorator để lấy user ID
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id;
  },
);

// Custom decorator cho roles
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

// Custom decorator cho API version
export const ApiVersion = (version: string) => SetMetadata('version', version);
```

#### 2. Type Guards

```typescript
// src/guards/type.guards.ts

// Type guard để kiểm tra user object
export function isUser(obj: any): obj is IUser {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.name === 'string' &&
    obj.createdAt instanceof Date
  );
}

// Type guard để kiểm tra admin user
export function isAdmin(user: IUser): boolean {
  return user.role === UserRole.ADMIN;
}

// Type guard để kiểm tra active user
export function isActiveUser(user: IUser): boolean {
  return user.status === UserStatus.ACTIVE;
}

// Usage trong service
export class UserService {
  async findActiveAdmins(): Promise<IUser[]> {
    const users = await this.userRepository.find();
    return users.filter(user => isUser(user) && isAdmin(user) && isActiveUser(user));
  }
}
```

#### 3. Conditional Types

```typescript
// src/types/conditional.types.ts

// Conditional type cho API response
type ApiResponseType<T, E = never> = E extends never 
  ? { data: T; success: true }
  : { error: E; success: false };

// Conditional type cho optional properties
type OptionalIfNullable<T> = {
  [P in keyof T]: null extends T[P] ? T[P] | undefined : T[P];
};

// Conditional type cho deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Conditional type cho validation
type ValidationResult<T> = {
  isValid: true;
  data: T;
} | {
  isValid: false;
  errors: string[];
};
```

#### 4. Mapped Types

```typescript
// src/types/mapped.types.ts

// Mapped type để tạo readonly version
type ReadonlyUser = Readonly<IUser>;

// Mapped type để tạo nullable version
type NullableUser = {
  [K in keyof IUser]: IUser[K] | null;
};

// Mapped type để tạo API response types
type ApiResponses<T> = {
  [K in keyof T]: ApiResponse<T[K]>;
};

// Mapped type cho form fields
type FormFields<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
    touched: boolean;
  };
};
```

### TypeScript với Database (TypeORM)

#### 1. Entity với TypeScript

```typescript
// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @ManyToOne(() => Department, department => department.users)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
```

#### 2. Repository với TypeScript

```typescript
// src/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // Generic find method với type safety
  async findWithRelations<T extends keyof User>(
    options: {
      select?: T[];
      where?: Partial<User>;
      relations?: string[];
      order?: Record<string, 'ASC' | 'DESC'>;
      skip?: number;
      take?: number;
    }
  ): Promise<User[]> {
    return this.repository.find(options);
  }

  // Method với query builder và type safety
  async findActiveUsers(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.status = :status', { status: UserStatus.ACTIVE })
      .leftJoinAndSelect('user.department', 'department')
      .getMany();
  }

  // Method với pagination
  async findWithPagination(
    page: number = 1,
    limit: number = 10,
    filters?: Partial<User>
  ): Promise<PaginatedResponse<User>> {
    const [data, total] = await this.repository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
```

### TypeScript với Validation

#### 1. DTOs với Validation

```typescript
// src/dto/user.dto.ts
import { IsEmail, IsString, IsOptional, MinLength, MaxLength, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString({ message: 'Tên phải là chuỗi' })
  @MinLength(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  @MaxLength(50, { message: 'Tên không được quá 50 ký tự' })
  name: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  role?: UserRole;

  @IsOptional()
  @IsUUID('4', { message: 'Department ID không hợp lệ' })
  departmentId?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Transform(({ value }) => value?.toLowerCase())
  email?: string;

  @IsOptional()
  @IsString({ message: 'Tên phải là chuỗi' })
  @MinLength(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  @MaxLength(50, { message: 'Tên không được quá 50 ký tự' })
  name?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  role?: UserRole;

  @IsOptional()
  @IsEnum(UserStatus, { message: 'Trạng thái không hợp lệ' })
  status?: UserStatus;
}

export class UserQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
```

#### 2. Custom Validation Pipes

```typescript
// src/pipes/validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      );
      throw new BadRequestException({
        message: 'Validation failed',
        errors: messages,
      });
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

### TypeScript với Error Handling

#### 1. Custom Exceptions

```typescript
// src/exceptions/custom.exceptions.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(userId: string) {
    super(`User with ID ${userId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class EmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(`Email ${email} already exists`, HttpStatus.CONFLICT);
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid email or password', HttpStatus.UNAUTHORIZED);
  }
}

export class InsufficientPermissionsException extends HttpException {
  constructor(requiredRole: string) {
    super(`Insufficient permissions. Required role: ${requiredRole}`, HttpStatus.FORBIDDEN);
  }
}
```

#### 2. Error Response Types

```typescript
// src/types/error.types.ts

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  errors: {
    field: string;
    message: string;
  }[];
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

### TypeScript với Configuration

#### 1. Configuration Types

```typescript
// src/config/types.ts

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export interface AppConfig {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  cors: {
    origin: string | string[];
    credentials: boolean;
  };
}

export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JwtConfig;
}
```

#### 2. Configuration Service

```typescript
// src/config/configuration.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './types';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get app(): Config['app'] {
    return {
      port: this.configService.get<number>('PORT', 3001),
      nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
      apiPrefix: this.configService.get<string>('API_PREFIX', 'api'),
      cors: {
        origin: this.configService.get<string>('CORS_ORIGIN', 'http://localhost:3000'),
        credentials: this.configService.get<boolean>('CORS_CREDENTIALS', true),
      },
    };
  }

  get database(): Config['database'] {
    return {
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 3306),
      username: this.configService.get<string>('DB_USERNAME', 'root'),
      password: this.configService.get<string>('DB_PASSWORD', ''),
      database: this.configService.get<string>('DB_DATABASE', 'nestjs_db'),
      synchronize: this.configService.get<boolean>('DB_SYNC', false),
      logging: this.configService.get<boolean>('DB_LOGGING', false),
    };
  }

  get jwt(): Config['jwt'] {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1d'),
      refreshExpiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    };
  }
}
```

### TypeScript với Testing

#### 1. Test Types

```typescript
// src/types/test.types.ts

export interface TestUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
}

export interface TestCreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface TestResponse<T> {
  body: T;
  status: number;
  headers: Record<string, string>;
}
```

#### 2. Test Utilities

```typescript
// src/utils/test.utils.ts
import { faker } from '@faker-js/faker';
import { TestCreateUserDto, TestUser } from '../types/test.types';

export class TestUtils {
  static createMockUser(overrides: Partial<TestUser> = {}): TestUser {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      ...overrides,
    };
  }

  static createMockCreateUserDto(overrides: Partial<TestCreateUserDto> = {}): TestCreateUserDto {
    return {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...overrides,
    };
  }

  static createMockUsers(count: number): TestUser[] {
    return Array.from({ length: count }, () => this.createMockUser());
  }
}
```

### Best Practices TypeScript trong NestJS

#### 1. Strict Type Checking

```typescript
// tsconfig.json - Strict mode
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

#### 2. Type Safety với API Responses

```typescript
// src/interfaces/api.interface.ts

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    path: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    path: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Usage trong controller
@Get()
async findAll(): Promise<ApiSuccessResponse<User[]>> {
  const users = await this.userService.findAll();
  return {
    success: true,
    data: users,
    message: 'Users retrieved successfully',
    meta: {
      timestamp: new Date().toISOString(),
      path: '/users',
    },
  };
}
```

#### 3. Generic Services

```typescript
// src/services/base.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IBaseEntity, IBaseService } from '../interfaces/base.interface';

@Injectable()
export abstract class BaseService<T extends IBaseEntity, CreateDto, UpdateDto>
  implements IBaseService<T, CreateDto, UpdateDto>
{
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new Error(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async create(createDto: CreateDto): Promise<T> {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  async update(id: string, updateDto: UpdateDto): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
```

#### 4. Type Guards và Assertions

```typescript
// src/utils/type.utils.ts

// Type assertion function
export function assertIsUser(obj: any): asserts obj is IUser {
  if (!obj || typeof obj.id !== 'string' || typeof obj.email !== 'string') {
    throw new Error('Object is not a valid User');
  }
}

// Type guard với error handling
export function ensureIsUser(obj: any): IUser {
  if (!isUser(obj)) {
    throw new Error('Invalid user object');
  }
  return obj;
}

// Safe property access
export function safeGet<T, K extends keyof T>(obj: T, key: K): T[K] | undefined {
  return obj?.[key];
}

// Deep property access với type safety
export function deepGet<T>(obj: any, path: string): T | undefined {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
```

### Debugging TypeScript trong NestJS

#### 1. Source Maps

```json
// tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSourceMap": false,
    "declarationMap": true
  }
}
```

#### 2. Type Checking trong Runtime

```typescript
// src/utils/runtime-type-check.ts
export function validateUserData(data: any): data is IUser {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.email === 'string' &&
    typeof data.name === 'string' &&
    data.createdAt instanceof Date
  );
}

// Usage
export class UserService {
  async processUserData(data: any): Promise<IUser> {
    if (!validateUserData(data)) {
      throw new Error('Invalid user data structure');
    }
    
    // TypeScript now knows data is IUser
    return this.processValidUser(data);
  }

  private processValidUser(user: IUser): IUser {
    // Safe to use user properties
    return user;
  }
}
```

---

## Kết luận

TypeScript trong NestJS cung cấp một hệ thống type safety mạnh mẽ giúp:

- **Phát hiện lỗi sớm**: Compile-time error checking
- **Code completion**: IDE support tốt hơn
- **Refactoring an toàn**: Thay đổi code mà không sợ breaking changes
- **Documentation**: Types serve as documentation
- **Team collaboration**: Code dễ hiểu và maintain hơn

Việc sử dụng TypeScript trong NestJS không chỉ là best practice mà còn là cách để xây dựng ứng dụng robust và scalable. Hãy bắt đầu với các khái niệm cơ bản và dần dần áp dụng các advanced features khi cần thiết.

NestJS cung cấp một framework mạnh mẽ cho Node.js với kiến trúc tương tự Laravel. Việc chuyển đổi từ Laravel sang NestJS sẽ mất thời gian để làm quen với TypeScript và các decorators, nhưng các khái niệm cơ bản như MVC, DI, middleware đều tương tự.

Tài liệu này cung cấp hướng dẫn chi tiết để bạn có thể bắt đầu với NestJS một cách hiệu quả. Hãy thực hành từng phần một và xây dựng dần dần ứng dụng của bạn. 