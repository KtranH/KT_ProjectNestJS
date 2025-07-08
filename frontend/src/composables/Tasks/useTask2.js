import { ref } from 'vue';
import { task2API } from '@/apis/user';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useTask2 = () => {
    const users = ref([]);
    const loading = ref(false);
    const loadingAdd = ref(false);
    const error = ref(null);

    const getUsers = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await task2API.getUsers();
            if (response && response.data && response.data.status === 'success' && response.data.data) {
                users.value = response.data.data;
                toast.success('Lấy danh sách user thành công', {
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
            error.value = err.response?.data?.message || 'Đã xảy ra lỗi';
            toast.error(error.value, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } finally {
            loading.value = false;
        }
    }

    const addUser = async (user) => {
        loadingAdd.value = true;
        error.value = null;

        try {
            const response = await task2API.addUser(user);
            if (response && response.data && response.data.status === 'success' && response.data.data) {
                users.value.push(response.data.data);
                toast.success('Thêm user thành công', {
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
            error.value = err.response?.data?.message || 'Đã xảy ra lỗi';
            toast.error(error.value, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } finally {
            loadingAdd.value = false;
        }
    }

    return {
        users,
        loading,
        loadingAdd,
        error,
        getUsers,
        addUser,
    }
}