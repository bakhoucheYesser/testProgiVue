import axios from 'axios';
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore();


const axiosInstance = axios.create({
    baseURL: '/api',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            authStore.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

