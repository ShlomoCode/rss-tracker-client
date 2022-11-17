<template>
    <div>
        <v-card elevation="0" style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5">
            <v-card-title class="text-h5">
                <slot />
            </v-card-title>
            <v-card-text>
                יכול להיות שהמאמר ישן ונמחק אוטומטית, או שהיתה טעות בקישור.
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup></script>