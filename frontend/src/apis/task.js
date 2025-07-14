// Các API task 1
import { api } from './config';

export const Task1API = {
    getTasks: async () => {
        console.log('API: getTasks called');
        return await api.get('/tasks');
    },
    addTask: async (task) => {
        console.log('API: addTask called with:', task);
        return await api.post('/tasks', task);
    },
    updateTask: async (id, task) => {
        console.log('API: updateTask called with:', { id, task });
        return await api.put(`/tasks/${id}`, task);
    },
    deleteTask: async (id) => {
        console.log('API: deleteTask called with:', id);
        return await api.delete(`/tasks/${id}`);
    },
}