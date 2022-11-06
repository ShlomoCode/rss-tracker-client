<template>
    <v-card width="400" class="mx-auto mt-3 mb-3">
        <v-card-title>
            <h2 class="text-h4">הרשמה</h2>
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="register()">
                <v-text-field reverse label="כתובת אימייל" prepend-icon="mdi-email" v-model="email" inputmode="email"
                    :error="emailInvalid" :error-messages="emailInvalidMsg" />
                <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="סיסמה"
                    prepend-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword" :error="passwordInvalid"
                    :error-messages="passwordInvalidMsg" />
                <v-col cols="12" class="text-left">
                    <v-btn type="submit" color="success" :loading="loading">
                        <v-icon>
                            mdi-account-plus
                        </v-icon>
                        הרשמה
                    </v-btn>
                </v-col>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            כבר יש לך חשבון?
            <v-btn color="info" @click="toggleFormShow()">
                <v-icon>
                    mdi-login
                </v-icon>
                התחבר
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
    
<script setup>
import validator from 'validator';
import { zxcvbn } from '@zxcvbn-ts/core'
import { ref, computed } from "vue";
import { useUserStore } from '@/stores/user';
import { useSnacksStore } from "@/stores/snacks";

const userStore = useUserStore();
const snacksStore = useSnacksStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const emit = defineEmits(['toggle-form-show']);
const toggleFormShow = () => {
    emit('toggle-form-show');
}

const loading = ref(false);
const register = async () => {
    validateForm.value = true;
    if (emailInvalid.value || passwordInvalid.value) return;

    loading.value = true;
    try {
        await userStore.register({
            email: email.value,
            password: password.value
        })
        snacksStore.addSnack({
            text: 'נרשמת בהצלחה! זמן טוב להתחבר לחשבון...',
            color: 'success'
        })
        emit('toggle-form-show');
    } catch (err) {
        snacksStore.addSnack({
            text: err.message,
            color: 'error'
        })
    }
    finally {
        loading.value = false;
    }
}

const validateForm = ref(false);

const emailInvalid = computed(() => {
    return validateForm.value && !validator.isEmail(email.value);
});

const emailInvalidMsg = computed(() => {
    if (!emailInvalid.value) return '';
    if (validator.isEmpty(email.value)) return 'שדה חובה';
    if (!validator.isEmail(email.value)) return 'כתובת אימייל לא תקינה';
    return '';
});

const passwordInvalid = computed(() => {
    return validateForm.value && zxcvbn(password.value).score < 1
});

const passwordInvalidMsg = computed(() => {
    if (!passwordInvalid.value) return '';
    if (validator.isEmpty(password.value)) return 'שדה חובה';
    if (zxcvbn(password.value).score < 1) return 'הסיסמה חלשה מידי';
    return '';
});

</script>