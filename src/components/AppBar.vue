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
      <LogOutBtn />
    </template>
    <template v-slot:append></template>
  </v-app-bar>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from "@/stores/user.js";
import { useRouter } from 'vue-router';
import LogOutBtn from '@/components/LogOutBtn.vue';

const $router = useRouter()
const userStore = useUserStore();

const { isLoggedIn, ivVerified } = storeToRefs(userStore);
</script>