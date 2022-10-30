import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import axios from '@/services/axios'

export const useUserStore = defineStore('user', () => {
    const initialUserState = {
        name: '',
        email: '',
        verified: false
    }

    const user = reactive({ ...initialUserState })

    const userInStorage = localStorage.getItem('user')
    if (userInStorage) {
        const userFromStorage = JSON.parse(userInStorage)
        Object.assign(user, userFromStorage)
    }

    watch(() => user, (state) => {
        localStorage.setItem('user', JSON.stringify(state))
    }, { deep: true })

    const isLoggedIn = computed(() => !!user.email)
    const isVerified = computed(() => user.verified)

    function login ({ email, password }) {
        return axios.post('users/login', { email, password })
            .then(({ data }) => {
                Object.assign(user, data.user)
            })
    }

    function register ({ name, email, password }) {
        return axios.post('users/signup', { name, email, password })
    }

    function verifyEmail (code) {
        return axios.post('users/verify', { code })
            .then(() => {
                user.verified = true
            })
    }

    function sendVerifyEmail () {
        return axios.post('users/resendVerificationEmail')
    }

    function sendPasswordResetEmail (email) {
        return axios.post('users/reset-password', { email })
    }

    function logout () {
        Object.assign(user, initialUserState)
        return axios.post('users/logout')
    }

    return {
        user,
        isLoggedIn,
        isVerified,
        login,
        register,
        verifyEmail,
        sendVerifyEmail,
        sendPasswordResetEmail,
        logout
    }
})