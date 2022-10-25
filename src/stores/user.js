import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = reactive({
        name: '',
        email: ''
    })
    
    const isLoggedIn = computed(() => !!user.email.value)
    
    const fakePromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    async function login ({ email, password }) {
        await fakePromise(1000) // fake api call
        user.email = email || 'abc@gmail.com'
        user.name = 'משה'
    }

    async function logout () {
        await fakePromise(700) // fake api call
        user.email = ''
        user.name = ''
    }

    async function register ({ name, email, password }) {
        await fakePromise(1000) // fake api call
    }

    return {
        isLoggedIn,
        login,
        register,
        logout
    }
}
)