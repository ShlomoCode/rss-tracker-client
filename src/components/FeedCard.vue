<template>
    <v-card class="ma-1 ml-2" :style="`border-bottom: 5px solid ${feed.subscribed ? '#69a8e673' : '#8080807a'}`">
        <v-card-title>
            <h3>
                {{ shortFeedTitle }}
            </h3>
            <v-chip class="ma-2" color="blue-darken-1" prepend-icon="mdi-link"
                :href="feed.url.replace(/feed|xml|rss$/, '')" target="_blank">
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
                {{ feed.subscribed ? 'בטל' : 'קבל' }} התראות ({{ feed.subscribersCount }})
            </v-btn>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" :to="{ name: 'FeedPage', params: { feedId: feed.id } }">
                <v-icon>
                    mdi-archive-outline
                </v-icon>
                אחרונים
            </v-btn>
            <v-spacer></v-spacer>
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
    const limitChars = 50
    if (feed.value.title.length > limitChars) {
        return feed.value.title.slice(0, limitChars - 3) + '...'
    }
    return feed.value.title
})

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