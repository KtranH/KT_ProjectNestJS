import AppDataSource from '../../config/database.config';
import { User } from '../../entities/user.entity';
//import { Task, TaskStatus } from '../../entities/task.entity';
//import { Comment } from '../../entities/comment.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  await AppDataSource.initialize();

  // Hash passwords
  const password1 = await bcrypt.hash('password123', 10);
  const password2 = await bcrypt.hash('password456', 10);

  // Seed users
  const user1 = AppDataSource.manager.create(User, {
    username: 'admin',
    password: password1,
    fullName: 'Admin',
    email: 'admin@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const user2 = AppDataSource.manager.create(User, {
    username: 'user',
    password: password2,
    fullName: 'User 2',
    email: 'hoangkhoi230@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await AppDataSource.manager.save([user1, user2]);

  /*// Seed tasks
  const task1 = AppDataSource.manager.create(Task, {
    name: 'Task 1',
    description: 'Mô tả task 1',
    status: TaskStatus.PENDING,
    user: user1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const task2 = AppDataSource.manager.create(Task, {
    name: 'Task 2',
    description: 'Mô tả task 2',
    status: TaskStatus.IN_PROGRESS,
    user: user2,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await AppDataSource.manager.save([task1, task2]);

  // Seed comments
  const comment1 = AppDataSource.manager.create(Comment, {
    content: 'Bình luận 1 cho task 1',
    task: task1,
    user: user1,
    createdAt: new Date(),
  });
  const comment2 = AppDataSource.manager.create(Comment, {
    content: 'Bình luận 2 cho task 2',
    task: task2,
    user: user2,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await AppDataSource.manager.save([comment1, comment2]);
*/
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Lỗi seed:', err);
  process.exit(1);
});
