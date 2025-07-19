import { Module, forwardRef } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { EmailModule } from '../Email/email.module';
import { UserModule } from '../Users/user.module';

@Module({
  imports: [EmailModule, forwardRef(() => UserModule)],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
