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
                <h4 class="text-lg font-semibold text-gray-900">Thực hiện API Call</h4>
                <button 
                    @click="fetchTasks"
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
                                <h6 class="font-semibold text-gray-900 mb-1">{{ task.name || 'Task không có tiêu đề' }}</h6>
                                <p class="text-gray-600 text-sm mb-2">{{ task.description || 'Không có mô tả' }}</p>
                                <div class="flex items-center gap-4 text-xs text-gray-500">
                                    <span>ID: {{ task.id }}</span>
                                    <span class="text-blue-600">Đã tạo</span>
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="w-3 h-3 rounded-full bg-blue-500"></div>
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
    </div>
</template>

<script>
// Task 1
import { useTask1 } from '@/composables/Tasks/useTask1';

export default {
    name: 'Task1',
    setup() {
        const { tasks, loading, error, getTasks } = useTask1();

        const fetchTasks = async () => {
            try {
                await getTasks();
            } catch (err) {
                console.error('Error in fetchTasks:', err);
            }
        };

        return {
            tasks,
            loading,
            error,
            fetchTasks,
        }
    },
}
</script>