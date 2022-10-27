<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend></template>
    <v-toolbar-title outlined color="white" style="cursor:pointer" @click="$router.push({ name: 'HomePage' })">
      Rss Tracker
    </v-toolbar-title>
    <v-btn v-if="isLoggedIn && !ivVerified" :to="{ name: 'VerifyPage' }">אימות דוא"ל</v-btn>
    <template v-if="!isLoggedIn">
      <v-btn :to="{ name: 'LoginPage' }">
        <v-icon left>mdi-login</v-icon>
        התחברות
      </v-btn>
    </template>
    <template v-else>
      <v-btn @click.prevent="logout()" :loading="loading">
        <v-icon left>mdi-logout</v-icon>
        יציאה
      </v-btn>
    </template>
    <template v-slot:append></template>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia';
import { useUserStore } from "@/stores/user.js";
import { useSnacksStore } from '@/stores/snacks.js';
import { useRouter } from 'vue-router';

const $router = useRouter()
const snacksStore = useSnacksStore();
const userStore = useUserStore();

const { isLoggedIn, ivVerified } = storeToRefs(userStore);
const loading = ref(false);

const logout = async () => {
  try {
    loading.value = true;
    await userStore.logout();
    snacksStore.addSnack({
      text: "התנתקת בהצלחה. נתראה! 👋",
      color: "success",
    });
    $router.push({ name: 'HomePage' })
  } catch (error) {
    snacksStore.addSnack({
      color: "error",
      text: error.message,
    });
  } finally {
    loading.value = false;
  }
};
</script>