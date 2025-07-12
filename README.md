# Project NestJS + Vue 3

Dự án full-stack sử dụng NestJS cho backend và Vue 3 cho frontend với chức năng đăng nhập JWT.

## Cấu trúc dự án

```
ProjectNestJS/
├── backend/          # NestJS Backend
├── frontend/         # Vue 3 Frontend
└── doc/             # Tài liệu
```

## Cài đặt và chạy

### Backend (NestJS)

1. Cài đặt dependencies:
```bash
cd backend
npm install
```

2. Cấu hình database:
- Tạo database PostgreSQL tên `task_management`
- Cập nhật thông tin kết nối trong `src/config/database.config.ts`

3. Chạy migrations:
```bash
npm run migration:run
```

4. Seed dữ liệu:
```bash
npm run seed
```

5. Chạy server:
```bash
npm run start:dev
```

Server sẽ chạy tại `http://localhost:3000`

### Frontend (Vue 3)

1. Cài đặt dependencies:
```bash
cd frontend
npm install
```

2. Chạy development server:
```bash
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173`

## Chức năng đăng nhập JWT

### Tài khoản test

Sau khi chạy seed, bạn có thể sử dụng các tài khoản sau:

- **Username:** `admin`, **Password:** `password123`
- **Username:** `user`, **Password:** `password456`

### API Endpoints

#### Backend
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin user (cần JWT token)

#### Frontend
- `/login` - Trang đăng nhập
- `/dashboard` - Dashboard (cần đăng nhập)
- `/task` - Quản lý task (cần đăng nhập)

### Tính năng bảo mật

1. **JWT Authentication**: Sử dụng JWT token để xác thực
2. **Password Hashing**: Mật khẩu được mã hóa bằng bcrypt
3. **Route Guards**: Bảo vệ các route cần xác thực
4. **Auto Logout**: Tự động đăng xuất khi token hết hạn
5. **Token Storage**: Lưu token trong localStorage

### Cấu hình JWT

JWT được cấu hình trong `backend/src/Auth/auth.module.ts`:
- Secret key: `JWT_SECRET` environment variable
- Expiration: 1 giờ
- Algorithm: HS256

## Cấu trúc code

### Backend
- `src/Auth/` - Module xử lý authentication
- `src/entities/` - Database entities
- `src/config/` - Cấu hình database và JWT

### Frontend
- `src/apis/` - API calls
- `src/stores/modules/auth.js` - Auth state management
- `src/router/guards/` - Route guards
- `src/components/forms/LoginForm.vue` - Form đăng nhập

## Troubleshooting

### Lỗi kết nối database
- Kiểm tra PostgreSQL đã chạy chưa
- Kiểm tra thông tin kết nối trong `database.config.ts`
- Đảm bảo database `task_management` đã được tạo

### Lỗi JWT
- Kiểm tra `JWT_SECRET` environment variable
- Đảm bảo token được gửi đúng format: `Bearer <token>`

### Lỗi CORS
- Backend đã được cấu hình để chấp nhận request từ frontend
- Kiểm tra URL API trong `frontend/src/apis/config.js` 