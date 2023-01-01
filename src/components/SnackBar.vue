<template>
    <template v-for="snack in snacksStore.snacks" :key="snack.id">
        <v-snackbar v-model="snack.show" v-bind="snack"  :location="xs ? 'top' : 'bottom'" :position="xs ? 'absolute' : 'fixed'">
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
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();
const snacksStore = useSnacksStore();
</script>