<template>
    <v-card width="400" class="mx-auto mt-3 mb-3">
        <v-card-title>
            <h2 class="display-1">התחברות</h2>
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="login()">
                <v-text-field autofocus reverse required label="כתובת אימייל" prepend-icon="mdi-email"
                    v-model="email" />
                <v-text-field v-model="password" required :type="showPassword ? 'text' : 'password'" label="סיסמה"
                    prepend-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword" />
                <v-col cols="12" class="text-left">
                    <v-btn type="submit" color="success" :loading="loading">
                        <v-icon>mdi-login</v-icon>
                        התחברות
                    </v-btn>
                </v-col>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            עוד אין לך חשבון?
            <v-btn color="info" @click="toggleFormShow()">
                <v-icon>mdi-account-plus</v-icon>
                הירשם
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
    
<script setup>
import { ref } from "vue";
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useSnacksStore } from '@/stores/snacks'
const userStore = useUserStore();
const snacksStore = useSnacksStore();
const $router = useRouter()

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const emit = defineEmits(['toggle-form-show']);

const toggleFormShow = () => {
    emit('toggle-form-show');
}

const $props = defineProps({
    nextRoute: {
        type: String,
        required: true
    }
})

const loading = ref(false);
const login = async () => {
    loading.value = true;
    try {
        await userStore.login({
            email: email.value,
            password: password.value
        });
        snacksStore.add({
            text: 'התחברת בהצלחה. ברוך שובך :)',
            color: 'success'
        });
        $router.push($props.nextRoute);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}
</script>