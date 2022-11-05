<template>
  <v-app>
    <v-main>
      <AppBar />
      <router-view v-slot="{ Component, route }">
        <v-slide-x-transition mode="out-in">
          <div>
            <div class="ma-1" :class="smAndDown ? 'text-h6' : 'text-h5'">
              {{ route.meta.viewName }}
            </div>
            <component :is="Component" />
          </div>
        </v-slide-x-transition>
      </router-view>
      <SnackBar />
    </v-main>
  </v-app>
</template>

<script setup>
import { onErrorCaptured } from 'vue';
import AppBar from '@/components/AppBar.vue';
import SnackBar from '@/components/SnackBar.vue';
import { useSnacksStore } from '@/stores/snacks';
import { useDisplay } from 'vuetify'

const snacksStore = useSnacksStore();
const { smAndDown } = useDisplay();

onErrorCaptured((error) => {
  snacksStore.addSnack({
    text: 'Unhandled Error: ' + error.message,
    type: 'error',
    ltr: true,
  });
});
</script>
