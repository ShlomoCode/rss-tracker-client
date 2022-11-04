<template>
    <v-dialog v-model="showAddFeedDialog" activator="parent" :persistent="loadingAddFeed">
        <v-card>
            <v-card-title class="headline">הוספת מקור חדש</v-card-title>
            <v-progress-linear v-if="loadingAddFeed" color="green" indeterminate />
            <v-form @submit.prevent="addFeed">
                <v-card-text>
                    <v-text-field autofocus v-model="newFeedUrl" label="כתובת המקור" outlined
                        :rules="[val => !!val || 'שדה חובה', val => validator.isURL(val) || 'כתובת לא תקינה']"
                        :disabled="loadingAddFeed"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="showAddFeedDialog = false" :disabled="loadingAddFeed">
                        ביטול
                    </v-btn>
                    <v-btn color="green darken-1" text type="submit" :disabled="loadingAddFeed">
                        הוספה
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFeedsStore } from '@/stores/feeds'
import { useSnacksStore } from '@/stores/snacks'
import validator from 'validator'

const snacksStore = useSnacksStore()
const feedsStore = useFeedsStore()

const loadingAddFeed = ref(false)
const showAddFeedDialog = ref(false)
const newFeedUrl = ref('')

const addFeed = async () => {
    if (!validator.isURL(newFeedUrl.value)) return;
    loadingAddFeed.value = true
    try {
        if (!/feed|rss|xml$/.test(newFeedUrl.value)) {
            newFeedUrl.value = newFeedUrl.value.replace(/\/$/, '') + '/feed'
        }
        await feedsStore.createFeed(newFeedUrl.value)
        showAddFeedDialog.value = false
        snacksStore.addSnack({
            text: 'המקור נוסף בהצלחה',
            color: 'success'
        })
    } catch (error) {
        snacksStore.addSnack({
            text: error.message,
            color: 'error'
        })
    } finally {
        loadingAddFeed.value = false
    }
}

watch(showAddFeedDialog, (val) => {
    if (!val.value) {
        newFeedUrl.value = ''
    }
})
</script>