import { Injectable } from '@nestjs/common';

export interface Task {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Làm bài tập',
      description: 'Làm bài tập lý thuyết',
    },
    {
      id: 2,
      name: 'Làm bài tập',
      description: 'Làm bài tập lý thuyết',
    },
  ];

  // Lấy tất cả các tasks
  getAllTasks(): Task[] {
    try {
      return this.tasks;
    } catch (error) {
      console.error('Error in getAllTasks:', error);
      throw error;
    }
  }
  // Bổ sung thêm task mới
  addTask(task: Task): Task {
    try {
      this.tasks.push(task);
      return task;
    } catch (error) {
      console.error('Error in addTask:', error);
      throw error;
    }
  }
  // Xóa task
  deleteTask(id: number): Task[] {
    try {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      return this.tasks;
    } catch (error) {
      console.error('Error in deleteTask:', error);
      throw error;
    }
  }
  // Cập nhật task
  updateTask(id: number, task: Task): Task[] {
    try {
      const index = this.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
      return this.tasks;
    } catch (error) {
      console.error('Error in updateTask:', error);
      throw error;
    }
  }
}
