<template>
    <template v-for="snack in snacksStore.snacks" :key="snack.id">
        <v-snackbar v-model="snack.show" v-bind="snack" position="absolute">
            <div :style="snack.ltr ? 'direction: ltr !important;' : ''">
                {{ snack.text }}
            </div>
            <template v-slot:actions>
                <v-btn color="black" @click="snack.show = false">
                    אוקיי
                </v-btn>
            </template>
        </v-snackbar>
    </template>
</template>

<script setup>
import { useSnacksStore } from '@/stores/snacks';
const snacksStore = useSnacksStore();
</script>