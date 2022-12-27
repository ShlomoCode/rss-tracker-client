<template>
    <template v-if="error">
        <ErrorPage :error="error" />
    </template>
    <template v-else>
        <ConfirmLeavePageDialog @cancel="() => { showConfirmLeaveDialog = false; leaveTo = null }"
            @ok="() => { showConfirmLeaveDialog = false; skipConfirmLeavePageDialog = true }"
            v-model="showConfirmLeaveDialog" :leaveTo="leaveTo" />
        <SettingsForm v-bind="{ initialSettings, loadingSaveSettings, hasChanges }" @changeSettings="settings = $event" @save="saveSettings" />
    </template>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import ConfirmLeavePageDialog from './ConfirmLeavePageDialog.vue'
import SettingsForm from './SettingsForm.vue'
import ErrorPage from '@/components/Articles/ErrorFetchAlert.vue';
import { onBeforeRouteLeave } from 'vue-router'
import axios from '@/services/axios'
import { useSnacksStore } from '@/stores/snacks'
import { useUserStore } from '@/stores/user'

const snacksStore = useSnacksStore();
const userStore = useUserStore();
const error = ref('');
const initialSettings = ref({});
try {
    await axios.get('/users/settings').then(({ data }) => {
        initialSettings.value = data;
    })
} catch(err){
    error.value = err.message;
}

const { isLoggedIn } = storeToRefs(userStore);
const settings = ref({ ...initialSettings.value });
const showConfirmLeaveDialog = ref(false);
const leaveTo = ref(null);
const skipConfirmLeavePageDialog = ref(false);
const loadingSaveSettings = ref(false);

const hasChanges = computed(() => {
    return JSON.stringify(initialSettings.value) !== JSON.stringify(settings.value);
})

onBeforeRouteLeave(to => {
    if (!isLoggedIn.value || !hasChanges.value || skipConfirmLeavePageDialog.value) {
        return true
    }
    showConfirmLeaveDialog.value = true
    leaveTo.value = to
    return false
});

async function saveSettings () {
    loadingSaveSettings.value = true
    try {
        await axios.put('/users/settings', { ...settings.value });
        initialSettings.value = { ...settings.value }
        snacksStore.addSnack({
            text: '⚙️ ההעדפות שלך נשמרו בהצלחה',
            color: 'success'
        })
    } catch (err) {
        snacksStore.addSnack({
            text: err.message,
            color: 'error'
        })
    } finally {
        loadingSaveSettings.value = false
    }
}
</script>