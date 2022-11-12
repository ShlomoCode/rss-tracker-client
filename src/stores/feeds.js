import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/services/axios'

export const useFeedsStore = defineStore('feeds', () => {
    const feeds = ref([])

    function createFeed (feedUrl) {
        return axios.post('/feeds', { url: feedUrl }).then(({ data }) => {
            const { feed } = data;
            feeds.value.push({
                id: feed.id,
                subscribersCount: feed.subscribers,
                title: feed.title,
                url: feed.url,
                subscribed: feed.subscriberSelf
            });
        })
    }

    function subscribeToFeed (feedId) {
        return axios.post(`/subscriptions/${feedId}`)
            .then(() => {
                const feedIndex = feeds.value.findIndex(feed => feed.id === feedId)
                feeds.value[feedIndex].subscribed = true
                feeds.value[feedIndex].subscribersCount++
            })
        }
        
        function unsubscribeFromFeed (feedId) {
            return axios.delete(`/subscriptions/${feedId}`)
            .then(() => {
                const feedIndex = feeds.value.findIndex(feed => feed.id === feedId)
                feeds.value[feedIndex].subscribed = false
                feeds.value[feedIndex].subscribersCount--
            })
    }

    function fetchFeeds () {
        return axios.get('/feeds').then(({ data }) => {
            feeds.value = data.feeds.map(feed => ({
                id: feed.id,
                subscribersCount: feed.subscribers,
                title: feed.title,
                url: feed.url,
                subscribed: feed.subscriberSelf
            }));
        })
    }

    return {
        feeds,
        createFeed,
        subscribeToFeed,
        unsubscribeFromFeed,
        fetchFeeds
    }
})