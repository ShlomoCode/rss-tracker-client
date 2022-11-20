<template>
    <div>
        <Suspense>
            <template #default>
                <TheTags />
            </template>
            <template #fallback>
                <div>
                    <v-progress-linear color="green" indeterminate />
                    <v-card class="mx-auto mt-8" elevation="1" style="filter: blur(8px);">
                        <v-card-text>
                            <v-chip v-for="n in 40" :key="n" class="ma-1 mb-3 ml-2" color="blue-darken-1">
                                <v-icon class="rotate-180 ml-1">
                                    mdi-label-outline
                                </v-icon>
                                תגית
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import TheTags from '@/components/Articles/TheTags.vue';
</script>