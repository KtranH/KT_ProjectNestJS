import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './Auth/auth.module';
import { TaskModule } from './Tasks/task.module';
import { UserModule } from './Users/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
