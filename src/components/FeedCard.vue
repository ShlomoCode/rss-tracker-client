<template>
    <v-card class="ma-1 ml-2" :style="feed.subscribed ? 'border-bottom: 5px solid #69a8e673' : 'border-bottom: 5px solid #8080807a'">
        <v-card-title>
            <h3>
                {{ shortFeedTitle }}
            </h3>
            <v-chip class="ma-2" color="blue-darken-1" text-color="white" prepend-icon="mdi-link" @click="openFeedSource">
                צפה במקור
            </v-chip>
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="feed.subscribed ? unsubscribe() : subscribe()"
                :loading="loadingChangeSubscription">
                <v-icon>
                    {{ feed.subscribed ? 'mdi-bell-off' : 'mdi-bell-plus' }}
                </v-icon>
                {{ feed.subscribed ? 'בטל' : 'קבל' }} התראות על תכנים חדשים ({{ feed.subscribersCount }})
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue'
import { useFeedsStore } from '@/stores/feeds'
import { useSnacksStore } from '@/stores/snacks'

const feedsStore = useFeedsStore()
const snacksStore = useSnacksStore()

const $props = defineProps({
    feed: {
        type: Object,
        required: true
    }
})

const { feed } = toRefs($props)
const loadingChangeSubscription = ref(false)

const shortFeedTitle = computed(() => {
    if (feed.value.title.length > 25) {
        return feed.value.title.slice(0, 25) + '...'
    }
    return feed.value.title
})

const openFeedSource = () => {
    window.open(feed.value.url.replace(/feed$/, ''), '_blank')
}

const subscribe = async () => {
    loadingChangeSubscription.value = true
    try {
        await feedsStore.subscribeToFeed(feed.value.id)
        snacksStore.addSnack({
            text: '🔔 נרשמת בהצלחה',
            color: 'success',
            timeout: 1000
        })
    } catch (error) {
        snacksStore.addSnack({
            text: error.message,
            color: 'error'
        })
    } finally {
        loadingChangeSubscription.value = false
    }
}

const unsubscribe = async () => {
    loadingChangeSubscription.value = true
    try {
        await feedsStore.unsubscribeFromFeed(feed.value.id)
        snacksStore.addSnack({
            text: '🔕 ההרשמה בוטלה בהצלחה',
            color: 'success',
            timeout: 1000
        })
    } catch (error) {
        snacksStore.addSnack({
            text: error.message,
            color: 'error'
        })
    } finally {
        loadingChangeSubscription.value = false
    }
}
</script>