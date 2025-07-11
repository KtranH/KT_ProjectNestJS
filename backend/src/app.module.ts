import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './Tasks/Task1/task1.module';
import { Task2Module } from './Tasks/Task2/task2.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule, TaskModule, Task2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
