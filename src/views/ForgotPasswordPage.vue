<template>
    <div>
        <v-card width="400" class="mx-auto mt-3 mb-3">
            <v-card-title>
                <h2 class="text-h4">
                    איפוס סיסמה
                </h2>
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="changePassword()">
                    <v-text-field autofocus reverse required label="כתובת אימייל" prepend-icon="mdi-email"
                        inputmode="email" v-model="email" :error="emailInvalid" :error-messages="emailInvalidMsg" />
                    <v-text-field v-model="token" required label="קוד האימות שקיבלת במייל" inputmode="numeric"
                        prepend-icon="mdi-form-textbox-password" :error="tokenInvalid"
                        :error-messages="tokenInvalidMsg" />
                    <v-text-field v-model="password" required :type="showPassword ? 'text' : 'password'"
                        label="סיסמה חדשה" prepend-icon="mdi-lock"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="showPassword = !showPassword" :error="passwordInvalid"
                        :error-messages="passwordInvalidMsg" />
                    <v-col cols="12" class="text-left">
                        <v-btn type="submit" color="success" :loading="loadingChangePassword"
                            :disabled="loadingForgotPassword">
                            <v-icon>
                                mdi-lock-reset
                            </v-icon>
                            שינוי סיסמה
                        </v-btn>
                    </v-col>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="warning" @click="forgotPassword()" :loading="loadingForgotPassword">
                    <v-icon>
                        mdi-lock-question
                    </v-icon>
                    לא קיבלתי סיסמה למייל
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
    
<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import validator from 'validator';
import { zxcvbn } from '@zxcvbn-ts/core'
import { useSnacksStore } from '@/stores/snacks'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const snacksStore = useSnacksStore();
const $router = useRouter()

const $props = defineProps({
    token: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    }
})

const { isLoggedIn } = storeToRefs(userStore);
const showPassword = ref(false);
const email = ref($props.email);
const token = ref($props.token);
const password = ref('');
const validateForm = ref(false);
if (isLoggedIn.value) {
    email.value = userStore.user.email;
}
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

const tokenInvalid = computed(() => {
    return validateForm.value && validator.isLength(token.value, { min: 5, max: 5 }) && !validator.isNumeric(token.value);
});

const tokenInvalidMsg = computed(() => {
    if (!validateForm.value) return '';
    if (validator.isEmpty(token.value)) return 'שדה חובה';
    if (!validator.isLength(token.value, { min: 5, max: 5 })) return 'הקוד צריך להכיל 5 תווים בדיוק';
    if (!validator.isNumeric(token.value)) return 'הקוד צריך להכיל רק מספרים';
    return '';
});

const loadingChangePassword = ref(false);
const changePassword = async () => {
    validateForm.value = true;
    if (emailInvalid.value || passwordInvalid.value || tokenInvalid.value) return;
    loadingChangePassword.value = true;
    try {
        await userStore.changePassword({
            email: email.value,
            password: password.value,
            token: token.value,
        });
        snacksStore.addSnack({
            text: 'הסיסמה שונתה בהצלחה',
            color: 'success'
        });
        if (isLoggedIn.value) {
            $router.push({ name: 'HomePage' });
        } else {
            $router.push({ name: 'LoginPage' });
        }
    } catch (error) {
        snacksStore.addSnack({
            text: error.message,
            color: 'error'
        });
    } finally {
        loadingChangePassword.value = false;
    }
}

const loadingForgotPassword = ref(false);
const forgotPassword = async () => {
    if (emailInvalid.value) return;
    loadingForgotPassword.value = true;
    try {
        await userStore.sendPasswordForgotEmail(email.value);
        snacksStore.addSnack({
            text: 'אוקיי, שלחנו לך למייל קוד אימות לאיפוס הסיסמה',
            color: 'success'
        });
    } catch (error) {
        snacksStore.addSnack({
            text: error.message,
            color: 'error'
        });
    } finally {
        loadingForgotPassword.value = false;
    }
}
</script>