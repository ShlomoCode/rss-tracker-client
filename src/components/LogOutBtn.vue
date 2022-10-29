<template>
    <div>
        <v-btn @click="logout()" :loading="loading">
            <v-icon left>mdi-logout</v-icon>
            יציאה
        </v-btn>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useSnacksStore } from '@/stores/snacks.js';
import { useRouter } from 'vue-router';

const snacksStore = useSnacksStore();
const $router = useRouter()
const userStore = useUserStore();

const loading = ref(false);

const logout = async () => {
    loading.value = true;
    try {
        await userStore.logout();
    } finally {
        snacksStore.addSnack({
            text: "התנתקת בהצלחה. נתראה! 👋",
            color: "success",
        });
        $router.push({ name: 'HomePage' })
        loading.value = false;
    }
};
</script>