<template>
    <div>
        <v-row>
            <template v-if="feeds.length">
                <v-col v-for="feed in feeds" :key="feed.id" cols="12" sm="6" md="4" lg="3">
                    <FeedCard :feed="feed" />
                </v-col>
            </template>
            <template v-else>
                <v-spacer></v-spacer>
                <v-col cols="10" justify="center">
                    <v-card>
                        <v-card-title class="headline">אין פידים מתאימים להצגה</v-card-title>
                        <v-card-text>
                            ניתן להוסיף פידים חדשים באמצעות לחיצה על הכפתור "הוסף מקור חדש" בצד שמאל
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-spacer></v-spacer>
            </template>
        </v-row>
    </div>
</template>

<script setup>
import { useFeedsStore } from '@/stores/feeds'
import { computed, toRefs } from 'vue'
import FeedCard from '@/components/FeedCard.vue'

const feedStore = useFeedsStore()

const $props = defineProps({
    search: {
        type: String,
        default: ''
    },
    showOnlySubs: {
        type: Boolean,
        required: true
    }
})
const { search, showOnlySubs } = toRefs($props)

await feedStore.fetchFeeds()

const feeds = computed(() => {
    let feeds = feedStore.feeds
    if (showOnlySubs.value) {
        feeds = feeds.filter(feed => feed.subscribed)
    }
    if (!search.value.length) {
        return feeds
    }
    return feeds.filter(feed => {
        return feed.title.toLowerCase().includes(search.value.toLowerCase())
    })
})
</script>