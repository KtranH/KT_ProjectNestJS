<template>
    <div class="space-y-6">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="text-xl font-bold">Task 2: Lấy danh sách các user từ Database</h3>
                    <p class="text-blue-100">API Endpoint: /users</p>
                </div>
            </div>
        </div>

        <!-- API Call Section -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-900">Gọi API lấy thông tin</h4>
                <button 
                    @click="getUsers"
                    :disabled="loading"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    {{ loading ? 'Đang tải...' : 'Lấy dữ liệu' }}
                </button>
            </div>

            <!-- Request Info -->
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">GET</span>
                    <code class="text-sm bg-gray-200 px-2 py-1 rounded">/users</code>
                </div>
                <p class="text-sm text-gray-600">Lấy danh sách tất cả các users từ backend</p>
            </div>
            <!-- Response Section -->
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="font-semibold text-red-800">Lỗi</span>
                </div>
                <p class="text-red-700">{{ error }}</p>
                <button 
                    @click="error = null"
                    class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                    Đóng thông báo
                </button>
            </div>

            <!-- Results -->
            <div v-if="users.length > 0" class="space-y-4">
                <h5 class="font-semibold text-gray-900">Kết quả ({{ users.length }} users):</h5>
                <div class="grid gap-4">
                    <div v-for="user in users" :key="user.id" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-start justify-between">
                            <!-- Edit Mode -->
                            <div v-if="editingUserId === user.id" class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input 
                                        v-model="editingUser.username"
                                        type="text"
                                        class="w-full p-2 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Nhập username"
                                        required
                                    />
                                </div>
                                <div class="flex items-center gap-2">
                                    <button 
                                        @click="saveUser(user.id)"
                                        :disabled="loadingUpdate"
                                        class="px-3 py-1 text-white bg-green-400 shadow-sm font-bold text-lg rounded hover:bg-gray-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                                    >
                                        <svg v-if="loadingUpdate" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </button>
                                    <button 
                                        @click="cancelEdit"
                                        :disabled="loadingUpdate"
                                        class="px-3 py-1 text-white bg-red-400 shadow-sm font-bold text-lg rounded hover:bg-gray-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <!-- View Mode -->
                            <div class="flex items-center">
                                <!-- Icon User -->
                                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h6 class="text-sm font-medium text-gray-900 mb-1">ID: {{ user.id }}</h6>
                                    <p class="text-sm text-gray-600">Username: {{ user.username }}</p>
                                </div>
                            </div>
                            <!-- Edit, Delete -->
                            <div class="flex items-center gap-2 mb-2">
                                <button 
                                    @click="startEdit(user)"
                                    class="px-2 py-1 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                                    :disabled="editingUserId !== null"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>
                                <button 
                                    @click="handleDeleteUser(user.id)"
                                    class="px-2 py-1 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    :disabled="editingUserId !== null"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!loading && !error" class="text-center py-8 text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <p>Chưa có dữ liệu. Hãy click "Lấy dữ liệu" để bắt đầu.</p>
            </div>
        </div>
        <!-- Add Task Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-4 mb-4 mt-4">
            <h5 class="font-semibold text-gray-900 mb-2">Thêm user mới</h5>
            <!-- Request Info -->
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">POST</span>
                    <code class="text-sm bg-gray-200 px-2 py-1 rounded">/users</code>
                </div>
                <p class="text-sm text-gray-600">Thêm user mới vào danh sách</p>
                <form @submit.prevent="handleAddUser(newUser)" class="space-y-4 mt-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                            v-model="newUser.username"
                            type="text"
                            id="username"
                            class="p-2 mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Nhập username"
                            required
                        />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            v-model="newUser.password"
                            type="password"
                            id="password"
                            class="p-2 mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Nhập password"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        @click="handleAddUser(newUser)"
                        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <svg v-if="loadingAdd" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ loadingAdd ? 'Đang thêm...' : 'Thêm user' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useTask2 } from '@/composables/Tasks/useTask2';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    setup() {
        const { users, loading, loadingAdd, loadingUpdate, loadingDelete, error, getUsers, addUser, updateUser, deleteUser } = useTask2();
        const newUser = ref({
            username: '',
            password: '',
        });

        // State cho edit inline
        const editingUserId = ref(null);
        const editingUser = ref({
            username: '',
        });

        // Bắt đầu edit
        const startEdit = (user) => {
            editingUserId.value = user.id;
            editingUser.value = {
                username: user.username || ''
            };
        };

        // Hủy edit
        const cancelEdit = () => {
            editingUserId.value = null;
            editingUser.value = {
                username: '',
            };
        };
        // Lưu user đã edit
        const saveUser = async (userId) => {
            // kiểm tra có thay đổi không
            if (editingUser.value.username === users.value.find(user => user.id === userId).username) {
                toast.error('Không có thay đổi', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return;
            }
            try {
                await updateUser(userId, editingUser.value);
                editingUserId.value = null;
                editingUser.value = {
                    username: '',
                };
            } catch (err) {
                error.value = err.response?.data?.message || 'Đã xảy ra lỗi';
            }
        }

        // Xóa user
        const handleDeleteUser = async (userId) => {
            try {
                Swal.fire({
                    title: 'Xóa user',
                    text: 'Bạn có chắc chắn muốn xóa user này không?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await deleteUser(userId);
                    }
                });
            } catch (err) {
                error.value = err.response?.data?.message || 'Đã xảy ra lỗi';
            }
        }

        // Thêm user
        const handleAddUser = async (user) => {
            loadingAdd.value = true;
            Swal.fire({
                title: 'Thêm user mới',
                text: 'Bạn có chắc chắn muốn thêm user mới không?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
            }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await addUser(user);
                } catch (err) {
                    error.value = err.response?.data?.message || 'Đã xảy ra lỗi';
                } finally {
                    loadingAdd.value = false;
                }
            }
        });
        }

        onMounted(() => {
            getUsers();
        });

        return {
            loading,
            error,
            users,
            getUsers,
            addUser,
            loadingAdd,
            loadingUpdate,
            loadingDelete,
            newUser,
            handleAddUser,
            editingUserId,
            editingUser,
            startEdit,
            cancelEdit,
            saveUser,
            handleDeleteUser,
        }
    },
}
</script>