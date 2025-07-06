// Các API task 1
import { api } from './config';
export const Task1API = {
    getTasks: () => api.get('/tasks'),
    addTask: (task) => api.post('/tasks', task),
    updateTask: (id, task) => api.put(`/tasks/${id}`, task),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
}