# Hướng dẫn NestJS cho người chuyển từ Laravel 11

## Mục lục
1. [Giới thiệu và so sánh với Laravel](#giới-thiệu-và-so-sánh-với-laravel)
2. [Cấu trúc dự án](#cấu-trúc-dự-án)
3. [Controllers](#controllers)
4. [Services](#services)
5. [Models và Database](#models-và-database)
6. [Routes](#routes)
7. [Middleware](#middleware)
8. [Validation](#validation)
9. [Authentication](#authentication)
10. [Kết nối Frontend](#kết-nối-frontend)
11. [Testing](#testing)
12. [Deployment](#deployment)

---

## Giới thiệu và so sánh với Laravel

### Điểm tương đồng
- **MVC Pattern**: Cả hai đều theo mô hình MVC
- **Dependency Injection**: Hỗ trợ DI container
- **Middleware**: Xử lý request/response
- **Validation**: Validate dữ liệu đầu vào
- **Database ORM**: Eloquent (Laravel) vs TypeORM/Prisma (NestJS)

### Khác biệt chính
- **Ngôn ngữ**: PHP (Laravel) vs TypeScript/JavaScript (NestJS)
- **Framework**: Laravel là PHP framework, NestJS là Node.js framework
- **Decorators**: NestJS sử dụng decorators (@Controller, @Get, etc.)
- **TypeScript**: NestJS được viết bằng TypeScript

---

## Cấu trúc dự án

### Cấu trúc thư mục chuẩn
```
src/
├── app.controller.ts          # Controller chính
├── app.service.ts            # Service chính
├── app.module.ts             # Module gốc
├── main.ts                   # Entry point
├── controllers/              # Controllers
├── services/                 # Services
├── entities/                 # Models/Entities
├── dto/                      # Data Transfer Objects
├── middleware/               # Custom middleware
├── guards/                   # Guards (tương tự middleware)
├── interceptors/             # Interceptors
├── pipes/                    # Pipes (validation)
└── config/                   # Cấu hình
```

---

## Controllers

### Tạo Controller cơ bản

```typescript
// src/controllers/user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
```

### So sánh với Laravel Controller

| Laravel | NestJS |
|---------|--------|
| `class UserController extends Controller` | `@Controller('users') class UserController` |
| `public function index()` | `@Get() async findAll()` |
| `public function store(Request $request)` | `@Post() async create(@Body() dto)` |
| `$request->input('name')` | `@Body() createUserDto` |

---

## Services

### Tạo Service

```typescript
// src/services/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(query?: any): Promise<User[]> {
    return this.userRepository.find({
      where: query,
      relations: ['profile', 'posts'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'posts'],
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
```

### So sánh với Laravel Service

| Laravel | NestJS |
|---------|--------|
| `class UserService` | `@Injectable() class UserService` |
| `User::find($id)` | `this.userRepository.findOne({ where: { id } })` |
| `User::create($data)` | `this.userRepository.create(dto)` |
| `$user->update($data)` | `Object.assign(user, dto)` |

---

## Models và Database

### Cài đặt TypeORM

```bash
npm install @nestjs/typeorm typeorm mysql2
```

### Cấu hình Database

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjs_db',
      entities: [User],
      synchronize: true, // Chỉ dùng trong development
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Tạo Entity (Model)

```typescript
// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false }) // Không select password khi query
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
```

### So sánh với Laravel Eloquent

| Laravel Eloquent | NestJS TypeORM |
|------------------|----------------|
| `class User extends Model` | `@Entity('users') class User` |
| `protected $fillable` | `@Column()` decorators |
| `$table->timestamps()` | `@CreateDateColumn() @UpdateDateColumn()` |
| `hasMany(Post::class)` | `@OneToMany(() => Post, post => post.user)` |
| `belongsTo(User::class)` | `@ManyToOne(() => User, user => user.posts)` |

### Migration

```typescript
// src/migrations/1234567890-CreateUsers.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
```

---

## DTOs (Data Transfer Objects)

### Tạo DTOs

```typescript
// src/dto/user.dto.ts
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;
}

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### So sánh với Laravel Form Requests

| Laravel Form Request | NestJS DTO |
|---------------------|------------|
| `class CreateUserRequest extends FormRequest` | `class CreateUserDto` |
| `public function rules()` | `@IsEmail() @IsString()` decorators |
| `$request->validated()` | DTO object |

---

## Routes

### Cấu hình Routes

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### Nested Routes

```typescript
// src/controllers/user.controller.ts
@Controller('users')
export class UserController {
  // GET /users
  @Get()
  findAll() {}

  // GET /users/123
  @Get(':id')
  findOne(@Param('id') id: string) {}

  // GET /users/123/posts
  @Get(':id/posts')
  findUserPosts(@Param('id') id: string) {}

  // POST /users/123/posts
  @Post(':id/posts')
  createUserPost(@Param('id') id: string, @Body() createPostDto: CreatePostDto) {}
}
```

### So sánh với Laravel Routes

| Laravel | NestJS |
|---------|--------|
| `Route::resource('users', UserController)` | `@Controller('users')` với decorators |
| `Route::get('/users/{id}', [UserController::class, 'show'])` | `@Get(':id') findOne(@Param('id') id)` |
| `Route::prefix('api/v1')->group()` | `@Controller('api/v1/users')` |

---

## Middleware

### Tạo Custom Middleware

```typescript
// src/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  }
}
```

### Áp dụng Middleware

```typescript
// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  // ...
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Áp dụng cho tất cả routes
  }
}
```

### Guards (Tương tự Middleware)

```typescript
// src/guards/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Kiểm tra authentication
    return this.validateRequest(request);
  }

  private validateRequest(request: any): boolean {
    // Logic kiểm tra token, session, etc.
    return true;
  }
}
```

### Áp dụng Guard

```typescript
// src/controllers/user.controller.ts
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard) // Áp dụng cho toàn bộ controller
export class UserController {
  @Get()
  @UseGuards(AuthGuard) // Hoặc áp dụng cho method cụ thể
  findAll() {}
}
```

### So sánh với Laravel Middleware

| Laravel Middleware | NestJS Middleware/Guard |
|-------------------|-------------------------|
| `php artisan make:middleware` | `class LoggerMiddleware implements NestMiddleware` |
| `protected $middleware` | `configure(consumer: MiddlewareConsumer)` |
| `Route::middleware(['auth'])` | `@UseGuards(AuthGuard)` |

---

## Validation

### Cài đặt Validation

```bash
npm install class-validator class-transformer
```

### Cấu hình Global Validation

```typescript
// src/main.ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Loại bỏ properties không được định nghĩa
    forbidNonWhitelisted: true, // Throw error nếu có properties không hợp lệ
    transform: true, // Tự động transform types
  }));
  
  await app.listen(3000);
}
```

### Custom Validation

```typescript
// src/pipes/custom-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Custom validation logic
    if (!value) {
      throw new BadRequestException('Value is required');
    }
    return value;
  }
}
```

### So sánh với Laravel Validation

| Laravel | NestJS |
|---------|--------|
| `$request->validate([...])` | `@IsEmail() @IsString()` decorators |
| `Form Request` | `DTO classes` |
| `Validator::make()` | `class-validator` library |

---

## Authentication

### Cài đặt JWT

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcrypt
```

### JWT Strategy

```typescript
// src/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

### Auth Service

```typescript
// src/services/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

### Auth Controller

```typescript
// src/controllers/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```

### So sánh với Laravel Auth

| Laravel Auth | NestJS Auth |
|--------------|-------------|
| `Auth::attempt()` | `validateUser()` method |
| `Auth::user()` | `@Request() req` |
| `auth:api` middleware | `@UseGuards(AuthGuard('jwt'))` |
| Sanctum/Passport | JWT Strategy |

---

## Kết nối Frontend

### CORS Configuration

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
  });
  
  await app.listen(3001);
}
```

### API Response Format

```typescript
// src/interceptors/transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  status: number;
  message: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        status: 200,
        message: 'Success',
      })),
    );
  }
}
```

### Frontend Integration (Vue.js)

```typescript
// frontend/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor để thêm token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userApi = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

export default api;
```

### Vue.js Component Example

```vue
<!-- frontend/src/components/UserList.vue -->
<template>
  <div>
    <h2>Danh sách người dùng</h2>
    <div v-if="loading">Đang tải...</div>
    <div v-else>
      <div v-for="user in users" :key="user.id" class="user-item">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button @click="deleteUser(user.id)">Xóa</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userApi } from '../services/api';

const users = ref([]);
const loading = ref(false);

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await userApi.getAll();
    users.value = response.data.data;
  } catch (error) {
    console.error('Lỗi khi tải danh sách người dùng:', error);
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (id) => {
  try {
    await userApi.delete(id);
    await fetchUsers(); // Reload danh sách
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
```

---

## Testing

### Unit Testing

```typescript
// src/services/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let mockRepository: any;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const mockUsers = [{ id: '1', name: 'John' }];
    mockRepository.find.mockResolvedValue(mockUsers);

    const result = await service.findAll();
    expect(result).toEqual(mockUsers);
  });
});
```

### E2E Testing

```typescript
// test/user.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      })
      .expect(201);
  });
});
```

### So sánh với Laravel Testing

| Laravel Testing | NestJS Testing |
|-----------------|----------------|
| `php artisan test` | `npm run test` |
| `$this->get('/users')` | `request(app.getHttpServer()).get('/users')` |
| `User::factory()` | Mock repositories |
| `DatabaseTransactions` | Test database |

---

## Deployment

### Production Configuration

```typescript
// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nestjs_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};
```

### Environment Variables

```env
# .env
NODE_ENV=production
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=nestjs_db
JWT_SECRET=your-secret-key
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=nestjs_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'nestjs-app',
    script: 'dist/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
  }],
};
```

---

## Best Practices

### 1. Error Handling

```typescript
// src/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exceptionResponse['message'] || exception.message,
    });
  }
}
```

### 2. Logging

```typescript
// src/interceptors/logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`${method} ${url} ${Date.now() - now}ms`);
      }),
    );
  }
}
```

### 3. Configuration Management

```typescript
// src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});
```

---

## Migration từ Laravel sang NestJS

### Checklist chuyển đổi

1. **Cấu trúc dự án**
   - [ ] Tạo cấu trúc thư mục NestJS
   - [ ] Cài đặt dependencies cần thiết
   - [ ] Cấu hình TypeScript

2. **Database**
   - [ ] Export schema từ Laravel
   - [ ] Tạo TypeORM entities
   - [ ] Viết migrations
   - [ ] Migrate dữ liệu

3. **API Endpoints**
   - [ ] Chuyển đổi Laravel routes sang NestJS controllers
   - [ ] Implement services
   - [ ] Tạo DTOs cho validation

4. **Authentication**
   - [ ] Implement JWT strategy
   - [ ] Chuyển đổi Laravel auth sang NestJS guards
   - [ ] Test authentication flow

5. **Frontend Integration**
   - [ ] Update API calls
   - [ ] Test CORS configuration
   - [ ] Verify authentication flow

### Lưu ý quan trọng

- **TypeScript**: NestJS sử dụng TypeScript, cần học syntax mới
- **Decorators**: Khái niệm mới trong JavaScript/TypeScript
- **Dependency Injection**: Tương tự Laravel nhưng syntax khác
- **Async/Await**: NestJS sử dụng async/await extensively
- **Observables**: NestJS sử dụng RxJS observables cho reactive programming

---

