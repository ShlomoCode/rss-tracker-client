import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = reactive({
        name: '',
        email: ''
    })
    
    const userInStorage = localStorage.getItem('user')
    if (userInStorage) {
        const { name, email } = JSON.parse(userInStorage)
        user.name = name
        user.email = email
    }

    watch(() => user, (state) => {
        localStorage.setItem('user', JSON.stringify(state))
    }, { deep: true })
    
    const isLoggedIn = computed(() => !!user.email)
    
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
        user,
        isLoggedIn,
        login,
        register,
        logout
    }
})