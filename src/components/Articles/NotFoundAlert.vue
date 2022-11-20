<template>
    <div>
        <v-card elevation="0" style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5">
            <v-card-title class="text-h5">
                <slot />
            </v-card-title>
            <v-card-text v-if="props.showTip">
                יכול להיות שהמאמר ישן ונמחק אוטומטית, או שהיתה טעות בקישור.
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
const props = defineProps({
    showTip: {
        type: Boolean,
        default: true
    }
})
</script>