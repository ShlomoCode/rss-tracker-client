<template>
    <Suspense>
        <template #default>
            <TheSettings />
        </template>
        <template #fallback>
            <v-progress-linear indeterminate color="green" />
        </template>
    </Suspense>
</template>

<script setup>
import TheSettings from '@/components/TheSettings.vue'
</script>