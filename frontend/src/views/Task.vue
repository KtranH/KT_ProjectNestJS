<template>
    <div class="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">Danh sách các tasks đã làm</h1>
            <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300"> 
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Lấy thông tin danh sách việc cần làm</h2>
                        <p class="text-gray-600">Lấy dữ liệu từ API endpoint /tasks</p>
                        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Lấy thông tin danh sách việc cần làm</span>
                                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" @click="showTask1Modal = true">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Lấy thông tin danh sách các user từ Database</h2>
                        <p class="text-gray-600">Lấy dữ liệu từ API endpoint /users</p>
                        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Lấy thông tin danh sách các user từ Database</span>
                                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" @click="showTask2Modal = true">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Popup cho Task1 -->
        <div v-if="showTask1Modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-900">Chi tiết Task 1</h2>
                    <button 
                        @click="showTask1Modal = false"
                        class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <!-- Content -->
                <div class="p-6">
                    <Task1 />
                </div>
            </div>
        </div>
        
        <!-- Modal Popup cho Task2 -->
        <div v-if="showTask2Modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-900">Chi tiết Task 2</h2>
                    <button 
                        @click="showTask2Modal = false"
                        class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="p-6">
                    <Task2 />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Task1 from '@/components/ui/Tasks/Task1.vue';
import Task2 from '@/components/ui/Tasks/Task2.vue';

export default {
    components: {
        Task1,
        Task2,
    },
    setup() {
        const showTask1Modal = ref(false);
        const showTask2Modal = ref(false);
        return {
            showTask1Modal,
            showTask2Modal,
        }
    },
}
</script>