<template>
    <v-card width="400" class="mx-auto mt-3 mb-3">
        <v-card-title>
            <h2 class="display-1">התחברות</h2>
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="login()">
                <v-text-field autofocus reverse required label="כתובת אימייל" prepend-icon="mdi-email" v-model="email" inputmode="email"
                    :error="emailInvalid" :error-messages="emailInvalidMsg" />
                <v-text-field v-model="password" required :type="showPassword ? 'text' : 'password'" label="סיסמה"
                    prepend-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword" :error="passwordInvalid"
                    :error-messages="passwordInvalidMsg" />
                <v-col cols="12" class="text-left">
                    <v-btn type="submit" color="success" :loading="loadingLogin">
                        <v-icon>
                            mdi-login
                        </v-icon>
                        התחברות
                    </v-btn>
                </v-col>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            עוד אין לך חשבון?
            <v-btn color="info" @click="toggleFormShow()">
                <v-icon>
                    mdi-account-plus
                </v-icon>
                הירשם
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="showForgotPasswordBtn" color="warning" @click="forgotPassword()" :loading="loadingForgotPassword">
                <v-icon>
                    mdi-lock-question
                </v-icon>
                שכחתי את הסיסמה
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
    
<script setup>
import validator from 'validator';
import { zxcvbn } from '@zxcvbn-ts/core'
import { ref, computed } from "vue";
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

const showForgotPasswordBtn = ref(false);
const loadingLogin = ref(false);
const login = async () => {
    validateForm.value = true;
    if (emailInvalid.value || passwordInvalid.value) return;
    loadingLogin.value = true;
    try {
        await userStore.login({
            email: email.value,
            password: password.value
        });
        if (userStore.isVerified) {
            snacksStore.addSnack({
                text: 'התחברת בהצלחה. ברוך הבא :)',
                color: 'success'
            });
            $router.push($props.nextRoute);
        } else {
            snacksStore.addSnack({
                text: 'התחברת בהצלחה, נשאר רק לאמת דוא"ל והכל מוכן',
                color: 'info'
            });
            if ($props.nextRoute === '/') {
                $router.push({ name: 'VerifyPage' });
            } else {
                $router.push('/verify?' + $props.nextRoute);
            }
        }
    } catch (error) {
        showForgotPasswordBtn.value = true;
        snacksStore.addSnack({
            text: error.message,
            color: 'error'
        });
    } finally {
        loadingLogin.value = false;
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
        $router.push({
            name: 'ForgotPasswordPage',
            query: {
                email: email.value
            }
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