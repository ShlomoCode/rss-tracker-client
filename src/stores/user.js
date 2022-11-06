import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import axios from '@/services/axios'

export const useUserStore = defineStore('user', () => {
    const initialUserState = {
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

    function register ({ email, password }) {
        return axios.post('users/signup', { email, password })
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

    function sendPasswordForgotEmail (email) {
        return axios.post('users/forgot-password', { email })
    }

    function changePassword ({ email, token, password }) {
        return axios.post('users/change-password', {
            newPassword: password,
            email,
            token
        }).then(()=>{
            clearUser()
        });
    }

    function clearUser () {
        Object.assign(user, initialUserState)
    }

    function logout () {
        clearUser()
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
        sendPasswordForgotEmail,
        changePassword,
        logout,
        clearUser
    }
})