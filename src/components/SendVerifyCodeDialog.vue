<template>
    <v-dialog v-model="open" activator="parent">
        <v-card>
            <v-card-text class="text-center">
                <template v-if="loading">
                    <h2>
                        <v-icon>
                            mdi-email-fast
                        </v-icon>
                        עובדים על זה...
                    </h2>
                    <v-progress-linear color="green" indeterminate />
                </template>
                <template v-else>

                    <h2>רק רגע אחד... 🤔</h2>
                    <p>
                        בדקת את תיבת הדוא"ל שלך? כן, גם את תיבת הספאם וקידומי מכירות...
                    </p>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" text :disabled="loading" @click="sendCodeAndCloseDialog()">
                    בדקתי ואין שום קוד - בבקשה שלח לי חדש!
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green" text :disabled="loading" @click="open = false">
                    הממ... אבדוק שוב ואעדכן :)
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useSnacksStore } from '@/stores/snacks'
import { useUserStore } from '@/stores/user';

const snacksStore = useSnacksStore();
const userStore = useUserStore();

const open = ref(false);
const loading = ref(false);
const sendCodeAndCloseDialog = async () => {
    loading.value = true;
    try {
        await userStore.sendVerifyEmail();
        snacksStore.addSnack({
            text: 'קוד אימות נשלח למייל שלך',
            color: 'success'
        })
    } catch (error) {
        snacksStore.addSnack({
            text: error.message,
            color: 'error'
        })
    } finally {
        loading.value = false;
        open.value = false;
    }
}
</script>
