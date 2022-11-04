import axios from 'axios';
import { useUserStore } from '@/stores/user';
import router from '@/router/index';

const axiosInstance = axios.create({
    baseURL: '/api/',
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const userStore = useUserStore();
            switch (error.response.headers['action-required']) {
                case 'login':
                    userStore.clearUser();
                    router.push({
                        name: 'LoginPage',
                        query: { next: router.currentRoute.value.fullPath }
                    });
                    break;
                case 'verify':
                    userStore.user.verified = false;
                    router.push({
                        name: 'VerifyPage',
                        query: { next: router.currentRoute.value.fullPath }
                    });
            }
        }
        if (error.response && error.response.data.message) error.message = error.response.data.message;
        return Promise.reject(error);
    }
);

export default axiosInstance;