<template>
    <div>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="4" md="auto" class="ma-1">
                <v-switch v-model="showOnlySubs" color="green" label="הצג רק מנויים פעילים" />
            </v-col>
            <v-col cols="12" sm="3" md="2" class="mt-0">
                <v-text-field v-model.trim="search" class="ml-1" variant="underlined" label="חיפוש" inputmode="search"
                    prepend-inner-icon="mdi-magnify" append-inner-icon="mdi-close" @click:append-inner="search = ''" />
            </v-col>
            <v-btn color="secondary" class="mt-6 ml-5">
                <AddFeedDialog />
                <v-icon start>
                    mdi-plus-circle
                </v-icon>
                הוסף מקור חדש
            </v-btn>
        </v-row>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AddFeedDialog from '@/components/AddFeedDialog.vue'

const search = ref('')
const showOnlySubs = ref(false)
const emits = defineEmits(['search', 'showOnlySubs'])

watch(search, (val) => {
    emits('search', val)
})

watch(showOnlySubs, (val) => {
    emits('showOnlySubs', val)
})
</script>