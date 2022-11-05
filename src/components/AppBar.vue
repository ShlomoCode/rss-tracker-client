<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend></template>
    <v-toolbar-title outlined @click="$router.push({ name: 'HomePage' })">
      <router-link :to="{ name: 'HomePage' }" style="color: white; text-decoration: none">
        Rss Tracker
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="isLoggedIn && !isVerified" :to="{ name: 'VerifyPage' }">אימות דוא"ל</v-btn>
    <v-btn v-if="isLoggedIn && isVerified" :to="{ name: 'SubscriptionsPage' }">ניהול המנויים</v-btn>
    <template v-if="!isLoggedIn">
      <v-btn :to="{ name: 'LoginPage' }">
        <v-icon start>mdi-login</v-icon>
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

const { isLoggedIn, isVerified } = storeToRefs(userStore);
</script>