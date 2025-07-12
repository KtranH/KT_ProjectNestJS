// Controllers
export { AuthController } from './controllers/auth.controller';

// Services
export { AuthService } from './services/auth.service';
export { UserService } from './services/user.service';

// Guards
export { JwtAuthGuard } from './guards/jwt-auth.guard';

// Decorators
export { CurrentUser } from './decorators/current-user.decorator';

// DTOs
export { LoginDto } from './dto/login.dto';
export { RegisterDto } from './dto/register.dto';

// Interfaces
export {
  JwtPayload,
  AuthResponse,
  UserProfile,
} from './interfaces/jwt-payload.interface';

// Module
export { AuthModule } from './auth.module';
