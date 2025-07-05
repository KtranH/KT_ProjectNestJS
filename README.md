# NestJS + Vue Full-Stack Project

Dự án full-stack sử dụng NestJS làm backend API và Vue.js (với Vite) làm frontend.

## Cấu trúc dự án

```
ProjectNestJS/
├── backend/          # NestJS API server
├── frontend/         # Vue.js với Vite
├── package.json      # Scripts chung cho cả dự án
└── README.md
```

## Yêu cầu

- Node.js >= 18.0.0
- npm

## Cài đặt

### Cài đặt tất cả dependencies

```bash
npm run install:all
```

### Hoặc cài đặt từng phần

```bash
# Cài đặt root dependencies
npm install

# Cài đặt backend dependencies
cd backend && npm install

# Cài đặt frontend dependencies
cd frontend && npm install
```

## Sử dụng

### Chạy cả hai server đồng thời (Development)

```bash
npm run dev
```

### Chạy riêng từng server

```bash
# Backend NestJS (port 3000)
npm run dev:backend

# Frontend Vue (port 5173)
npm run dev:frontend
```

## Build cho production

```bash
# Build cả hai
npm run build

# Build riêng từng phần
npm run build:backend
npm run build:frontend
```

## Testing

```bash
# Chạy test cho cả hai
npm run test

# Test riêng từng phần
npm run test:backend
npm run test:frontend
```

## API Endpoints

Backend NestJS chạy trên: `http://localhost:3000`

Frontend Vue chạy trên: `http://localhost:5173`

## Công nghệ sử dụng

### Backend
- NestJS
- TypeScript
- Node.js

### Frontend
- Vue.js 3
- Vite
- TypeScript (nếu được chọn)

### Dev Tools
- Concurrently (chạy đồng thời nhiều server)
- ESLint
- Prettier 