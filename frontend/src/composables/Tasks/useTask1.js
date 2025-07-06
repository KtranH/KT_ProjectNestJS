import { ref } from 'vue';
import { Task1API } from '@/apis/user';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useTask1 = () => {
    const tasks = ref([]);
    const loading = ref(false);
    const loadingAdd = ref(false);
    const loadingDelete = ref(false);
    const loadingUpdate = ref(false);
    const error = ref(null);

    const getTasks = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await Task1API.getTasks();
            if (response && response.data && response.data.status === 'success' && response.data.data) {
                tasks.value = response.data.data;
                toast.success('Lấy danh sách task thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
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

    const addTask = async (task) => {
        loadingAdd.value = true;
        error.value = null;

        try {
            const response = await Task1API.addTask(task);
            if (response && response.data && response.data.status === 'success' && response.data.data) {
                tasks.value.push(response.data.data);
                toast.success('Thêm task thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                throw new Error('Response format không hợp lệ');
            }
        } catch (err) {
            error.value = err.message;
            console.error('Error in addTask:', err);
        } finally {
            loadingAdd.value = false;
        }
    }

    const deleteTask = async (id) => {
        loadingDelete.value = true;
        error.value = null;

        try {
            const response = await Task1API.deleteTask(id);
            if (response && response.data && response.data.status === 'success' && response.data.data) {
                tasks.value = tasks.value.filter((task) => task.id !== id);
                toast.success('Xóa task thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                throw new Error('Response format không hợp lệ');
            }
        } catch (err) {
            error.value = err.message;
            console.error('Error in deleteTask:', err);
        } finally {
            loadingDelete.value = false;
        }
    }

    const updateTask = async (id, task) => {
        loadingUpdate.value = true;
        error.value = null;

        try {
            console.log('updateTask - Input:', { id, task });
            
            // Đảm bảo id là number
            const taskId = Number(id);
            if (isNaN(taskId)) {
                throw new Error('ID không hợp lệ');
            }
            
            const response = await Task1API.updateTask(taskId, task);
            console.log('updateTask - Response:', response);
            
            if (response && response.data && response.data.status === 'success' && response.data.data) {
                // Cập nhật task trong mảng local
                const index = tasks.value.findIndex(t => t.id === taskId);
                if (index !== -1) {
                    tasks.value[index] = response.data.data;
                    console.log('updateTask - Local state updated:', tasks.value[index]);
                } else {
                    console.warn('updateTask - Task not found in local state:', taskId);
                }
                toast.success('Cập nhật task thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                console.error('updateTask - Invalid response format:', response);
                throw new Error('Response format không hợp lệ');
            }
        } catch (err) {
            console.error('updateTask - Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                config: err.config
            });
            
            // Hiển thị thông báo lỗi chi tiết hơn
            let errorMessage = 'Lỗi khi cập nhật task';
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            error.value = errorMessage;
            console.error('Error in updateTask:', err);
            throw err; // Re-throw để component có thể catch
        } finally {
            loadingUpdate.value = false;
        }
    }

    return {
        tasks,
        loading,
        loadingAdd,
        loadingDelete,
        loadingUpdate,
        error,
        getTasks,
        addTask,
        deleteTask,
        updateTask,
    }
}