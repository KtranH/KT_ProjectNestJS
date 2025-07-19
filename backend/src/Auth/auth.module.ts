import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserModule } from '../Users/user.module';
import { EmailModule } from '../Email/email.module';
import { VerificationModule } from '../Verification/verification.module';
import jwtConfig from '../config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [],
      useFactory: () => ({
        secret: jwtConfig.secret,
        signOptions: {
          expiresIn: jwtConfig.signOptions.expiresIn,
        },
      }),
    }),
    forwardRef(() => UserModule),
    EmailModule,
    VerificationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
