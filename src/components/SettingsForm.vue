<template>
    <v-form @submit.prevent="emit('save')">
        <v-card :width="width < 400 ? 350 : 400" class="mx-auto mt-3 mb-3">
            <v-card-title class="text-h5">
                העדפות התראות
            </v-card-title>
            <v-switch v-model="settings.enableEmailNotifications" label="קבלת מאמרים ממקורות במעקב ישירות למייל" class="mx-5" color="green" />
            <v-switch v-model="settings.allowAttachmentsInEmail" label="אפשר שליחת תמונת מאמר כקובץ מצורף" class="mx-5" color="green" />
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green" :variant="props.hasChanges ? 'outlined' : 'text'" type="submit" :loading="props.loadingSaveSettings">
                    שמירה
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

const { width } = useDisplay();
const props = defineProps({
    initialSettings: {
        type: Object,
        required: true
    },
    loadingSaveSettings: {
        type: Boolean,
        required: true,
    },
    hasChanges: {
        type: Boolean,
        required: true
    }
})
const settings = ref({ ...props.initialSettings })
const emit = defineEmits(['changeSettings', 'save'])

watch(settings, (newSettings) => {
    emit('changeSettings', newSettings);
}, { deep: true })
</script>