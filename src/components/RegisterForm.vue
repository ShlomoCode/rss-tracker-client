<template>
    <v-card width="400" class="mx-auto mt-3 mb-3">
        <v-card-title>
            <h2 class="display-1">הרשמה</h2>
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="register()">
                <v-text-field autofocus label="שם פרטי" prepend-icon="mdi-account" v-model="name" />
                <v-text-field reverse label="כתובת אימייל" prepend-icon="mdi-email" v-model="email" />
                <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="סיסמה"
                    prepend-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword" />
                <v-col cols="12" class="text-left">
                    <v-btn type="submit" color="success" :loading="loading">
                        <v-icon>mdi-account-plus</v-icon>
                        הרשמה
                    </v-btn>
                </v-col>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            כבר יש לך חשבון?
            <v-btn color="info" @click="toggleFormShow()">
                <v-icon>mdi-login</v-icon>
                התחבר
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
    
<script setup>
import { ref } from "vue";
import { useUserStore } from '@/stores/user';
import { useSnacksStore } from "@/stores/snacks";

const userStore = useUserStore();
const snacksStore = useSnacksStore();

const name = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const emit = defineEmits(['toggle-form-show', 'register']);
const toggleFormShow = () => {
    emit('toggle-form-show');
}

const loading = ref(false);
const register = async () => {
    loading.value = true;
    try {
        await userStore.register({
            name, email, password
        })
        snacksStore.add({
            text: 'נרשמת בהצלחה! זמן טוב להתחבר לחשבון...',
            color: 'success'
        })
        emit('toggle-form-show');
    } catch (err) {
        snacksStore.add({
            text: err.message,
            color: 'error'
        })
    }
    finally {
        loading.value = false;
    }
}
</script>