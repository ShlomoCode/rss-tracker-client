import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'

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
    const ivVerified = computed(() => user.verified)

    const fakePromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    async function login ({ email, password }) {
        await fakePromise(1000) // fake api call
        user.email = email || 'abc@gmail.com'
        user.name = 'משה'
    }

    async function register ({ name, email, password }) {
        await fakePromise(1000) // fake api call
    }

    async function verifyEmail (code) {
        await fakePromise(1000) // fake api call
        user.verified = true
    }

    async function sendVerifyEmail (code) {
        await fakePromise(1000) // fake api call
    }

    async function logout () {
        await fakePromise(700) // fake api call
        Object.assign(user, initialUserState)
    }

    return {
        user,
        isLoggedIn,
        ivVerified,
        login,
        register,
        verifyEmail,
        sendVerifyEmail,
        logout
    }
})