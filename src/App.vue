<template>
  <v-app>
    <v-main>
      <AppBar />
      <router-view v-slot="{ Component }">
        <v-slide-x-transition mode="out-in">
          <component :is="Component" />
        </v-slide-x-transition>
      </router-view>
      <SnackBar />
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from '@/components/AppBar.vue';
import SnackBar from '@/components/SnackBar.vue';
</script>
