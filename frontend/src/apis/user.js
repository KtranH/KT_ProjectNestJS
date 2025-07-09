// Các API task 2
import { api } from './config';

export const task2API = {
    getUsers: async () => {
        console.log('API: getUsers called');
        return await api.get('/task2');
    },
    getUserById: async (id) => {
        console.log('API: getUserById called with:', id);
        return await api.get(`/task2/${id}`);
    },
    addUser: async (user) => {
        console.log('API: addUser called with:', user);
        return await api.post('/task2', user);
    },
    updateUser: async (userId, user) => {
        console.log('API: updateUser called with:', userId, user);
        return await api.put(`/task2/${userId}`, user);
    },
    deleteUser: async (userId) => {
        console.log('API: deleteUser called with:', userId);
        return await api.delete(`/task2/${userId}`);
    },
}