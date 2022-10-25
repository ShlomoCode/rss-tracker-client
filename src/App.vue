<template>
  <v-app>
    <v-main>
      <AppBar />
      <router-view />
      <SnackBar />
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from '@/components/AppBar.vue';
import SnackBar from '@/components/SnackBar.vue';
</script>
