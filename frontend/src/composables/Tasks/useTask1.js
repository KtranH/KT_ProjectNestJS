import { ref } from 'vue';
import { Task1API } from '@/apis/user';

export const useTask1 = () => {
    const tasks = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const getTasks = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await Task1API.getTasks();
            if (response && response.data && response.data.status === 'success' && response.data.data) {
                tasks.value = response.data.data;
            } else {
                throw new Error('Response format không hợp lệ');
            }
        } catch (err) {
            error.value = err.message;
            console.error('Error in getTasks:', err);
        } finally {
            loading.value = false;
        }
    }

    return {
        tasks,
        loading,
        error,
        getTasks,
    }
}