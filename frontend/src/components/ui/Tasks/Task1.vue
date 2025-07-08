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
                    <h3 class="text-xl font-bold">Task 1: Lấy danh sách việc cần làm</h3>
                    <p class="text-blue-100">API Endpoint: /tasks</p>
                </div>
            </div>
        </div>

        <!-- API Call Section -->
        <div class="bg-white border border-gray-200 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-900">Gọi API lấy thông tin</h4>
                <button 
                    @click="getTasks"
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
                    <code class="text-sm bg-gray-200 px-2 py-1 rounded">/tasks</code>
                </div>
                <p class="text-sm text-gray-600">Lấy danh sách tất cả các tasks từ backend</p>
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
            <div v-if="tasks.length > 0" class="space-y-4">
                <h5 class="font-semibold text-gray-900">Kết quả ({{ tasks.length }} tasks):</h5>
                <div class="grid gap-4">
                    <div 
                        v-for="task in tasks" 
                        :key="task.id"
                        class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <!-- Edit Mode -->
                                <div v-if="editingTaskId === task.id" class="space-y-3">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Tên task</label>
                                        <input 
                                            v-model="editingTask.name"
                                            type="text"
                                            class="w-full p-2 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Nhập tên task"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                        <textarea 
                                            v-model="editingTask.description"
                                            class="w-full p-2 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Nhập mô tả"
                                            rows="2"
                                            required
                                        ></textarea>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button 
                                            @click="saveTask(task.id)"
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
                                <div v-else>
                                    <h6 class="font-semibold text-gray-900 mb-1">{{ task.name || 'Task không có tiêu đề' }}</h6>
                                    <p class="text-gray-600 text-sm mb-2">{{ task.description || 'Không có mô tả' }}</p>
                                    <div class="flex items-center gap-4 text-xs text-gray-500">
                                        <span>ID: {{ task.id }}</span>
                                        <span class="text-blue-600">Đã tạo</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ml-4">
                                <!-- Edit, Delete -->
                                <div class="flex items-center gap-2 mb-2">
                                    <button 
                                        @click="startEdit(task)"
                                        class="px-2 py-1 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                                        :disabled="editingTaskId !== null"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button 
                                        @click="handleDeleteTask(task.id)"
                                        class="px-2 py-1 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
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
            <h5 class="font-semibold text-gray-900 mb-2">Thêm task mới</h5>
            <!-- Request Info -->
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">POST</span>
                    <code class="text-sm bg-gray-200 px-2 py-1 rounded">/tasks</code>
                </div>
                <p class="text-sm text-gray-600">Thêm task mới vào danh sách</p>
                </div>
                <form @submit.prevent="handleAddTask(newTask)" class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Tên task</label>
                        <input 
                            v-model="newTask.name"
                            type="text"
                            id="name"
                            class="p-2 mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Nhập tên task"
                            required
                        />
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea 
                            v-model="newTask.description"
                            id="description"
                            class="p-2 mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Nhập mô tả"
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <svg v-if="loadingAdd" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ loadingAdd ? 'Đang tải...' : 'Thêm task' }}
                </button>
            </form>
        </div>  
    </div>
</template>

<script>
// Task 1
import { ref, onMounted } from 'vue';
import { useTask1 } from '@/composables/Tasks/useTask1';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    name: 'Task1',
    setup() {
        const { tasks, loading, error, getTasks, addTask, loadingAdd, deleteTask, updateTask, loadingDelete, loadingUpdate } = useTask1();
        const newTask = ref({
            name: '',
            description: '',
        });

        // State cho edit inline
        const editingTaskId = ref(null);
        const editingTask = ref({
            name: '',
            description: ''
        });

        // Bắt đầu edit
        const startEdit = (task) => {
            editingTaskId.value = task.id;
            editingTask.value = {
                name: task.name || '',
                description: task.description || ''
            };
        };

        // Lưu task đã edit
        const saveTask = async (taskId) => {
            console.log('saveTask called with taskId:', taskId, typeof taskId);
            
            // Task cần thay đổi
            const task = tasks.value.find(t => t.id === taskId);
            console.log('Found task:', task);
            
            // Kiểm tra thông tin nhập vào
            if (!editingTask.value.name || !editingTask.value.description) {
                Swal.fire({
                    title: 'Lỗi',
                    text: 'Vui lòng nhập đầy đủ thông tin',
                    icon: 'error'
                });
                return;
            }
            // Kiểm tra sự thay đổi của task
            if (task.name === editingTask.value.name && task.description === editingTask.value.description) {
                Swal.fire({
                    title: 'Lỗi',
                    text: 'Không có thay đổi',
                    icon: 'error'
                });
                return;
            }
            // Thông báo hỏi xác nhận
            const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn có chắc chắn muốn cập nhật thông tin task này không?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',  
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy'
            });
            
            if (result.isConfirmed) {
                try {
                    // Tìm task trong danh sách và cập nhật
                    await updateTask(Number(taskId), editingTask.value);
                    cancelEdit();
                } catch (err) {
                    console.error('Error in saveTask:', err);
                    Swal.fire({
                        title: 'Lỗi',
                        text: err.message || 'Có lỗi xảy ra khi cập nhật task',
                        icon: 'error'
                    });
                }
            }
        };

        // Hủy edit
        const cancelEdit = () => {
            editingTaskId.value = null;
            editingTask.value = {
                name: '',
                description: ''
            };
        };

        // Thêm task mới với reset form
        const handleAddTask = async (taskData) => {
            await addTask(taskData);
            // Reset form sau khi thêm thành công
            newTask.value = {
                name: '',
                description: '',
            };
        };

        // Xóa task 
        const handleDeleteTask = async (taskId) => {
            // Thông báo hỏi xác nhận
            const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn có chắc chắn muốn xóa task này không?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy'
            });
            
            if (result.isConfirmed) {
                await deleteTask(taskId);
            }
        };

        // Lấy dữ liệu khi component mounted
        onMounted(() => {
            getTasks();
        });

        return {
            tasks,
            loading,
            error,
            getTasks,
            newTask,
            addTask,
            loadingAdd,
            editingTaskId,
            editingTask,
            startEdit,
            saveTask,
            cancelEdit,
            deleteTask,
            updateTask,
            loadingDelete,
            loadingUpdate,
            handleAddTask,
            handleDeleteTask,
        }
    },
}
</script>