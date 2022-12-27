<template>
    <v-card :width="width < 400 ? 350 : 400" class="mx-auto mt-3 mb-3">
        <v-card-title>
            <h2 class="text-h4">אימות דוא"ל</h2>
        </v-card-title>
        <v-card-text>
            <b>
                הקוד כבר מחכה לך במייל!
                צריך פשוט להכניס אותו כאן למטה:
            </b>
        </v-card-text>
        <v-card-text>
            <v-form @submit.prevent="verify()">
                <v-text-field autofocus reverse required label="קוד אימות" prepend-icon="mdi-lock-check" v-model="code" inputmode="numeric"
                    :error="codeInvalid" :error-messages="codeInvalidMsg" />
                <v-col cols="12" class="text-left">
                    <v-btn location="left" type="submit" color="success" :loading="loading">
                        שלח
                    </v-btn>
                </v-col>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            לא קיבלת את הקוד?
            <v-btn color="info">
                <v-icon>
                    mdi-email
                </v-icon>
                שלח לי קוד חדש
                <sendVerifyCodeDialog />
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import validator from 'validator'
import { useUserStore } from '@/stores/user';
import { useSnacksStore } from '@/stores/snacks'
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import sendVerifyCodeDialog from './SendVerifyCodeDialog.vue'

const { width } = useDisplay();
const userStore = useUserStore();
const snacksStore = useSnacksStore();
const $router = useRouter()

const $props = defineProps({
    nextRoute: {
        type: String,
        default: '/'
    },
    code: {
        type: String,
        default: ''
    }
})

const code = ref($props.code);
const loading = ref(false);

const validateCode = ref(false);
const codeInvalid = computed(() => {
    return validateCode.value && (!validator.isLength(code.value, { min: 5, max: 5 }) || !validator.isNumeric(code.value));
});
const codeInvalidMsg = computed(() => {
    if (!validateCode.value) return '';
    if (!validator.isLength(code.value, { min: 5, max: 5 })) return 'הקוד חייב להיות באורך 5 תווים';
    if (!validator.isNumeric(code.value)) return 'הקוד חייב להכיל מספרים בלבד';
    return '';
});

const verify = async () => {
    validateCode.value = true;
    if (codeInvalid.value) return;

    loading.value = true;
    try {
        await userStore.verifyEmail(code.value);
        snacksStore.addSnack({
            text: 'החשבון אומת בהצלחה!',
            color: 'success'
        })
        $router.push($props.nextRoute);
    } catch (error) {
        if (error.response && error.response.status === 409) {
            snacksStore.addSnack({
                text: 'החשבון שלך כבר מאומת',
                color: 'info'
            })
        } else {
            snacksStore.addSnack({
                text: error.message,
                color: 'error'
            })
        }
    } finally {
        loading.value = false;
    }
}
</script>