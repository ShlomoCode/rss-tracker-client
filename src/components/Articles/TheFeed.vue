<template>
    <div>
        <template v-if="error">
            <ErrorFetchAlert :error="error" />
        </template>
        <template v-else-if="articles.length">
            <v-divider></v-divider>
            <h2 class="text-center">
                נמצאו {{ articles.length }} כתבות תחת הפיד "{{ feed.title }}"
            </h2>
            <v-divider></v-divider>
            <template v-for="article in articles" :key="article.id">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="6">
                        <ArticleBanner :article="article" />
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </template>
        </template>
        <template v-else>
            <NotFoundAlert>
                לא נמצאו מאמרים מתאימים להצגה
            </NotFoundAlert>
        </template>
    </div>
</template>

<script setup>
import validator from 'validator';
import { toRefs, ref } from 'vue';
import ArticleBanner from '@/components/Articles/ArticleBanner.vue';
import NotFoundAlert from '@/components/Articles/NotFoundAlert.vue';
import ErrorFetchAlert from '@/components/Articles/ErrorFetchAlert.vue';
import { useSnacksStore } from '@/stores/snacks';
import axios from '@/services/axios';

const $props = defineProps({
    feedId: {
        type: String,
        required: true,
        validator: (value) => validator.isMongoId(value),
    }
});

const snacksStore = useSnacksStore();

const { feedId } = toRefs($props);

const articles = ref([]);
const feed = ref({});
const error = ref('')



try {
    if (!validator.isMongoId(feedId.value)) throw new Error('כתובת הפיד אינה תקינה');
    const { data } = await axios.get(`/articles/by-feed-id/${feedId.value}`);
    articles.value = data.articles;
    feed.value = data.feed;
    document.title = `Rss Tracker - ${feed.value.title}`;
} catch (err) {
    error.value = err.message;
    snacksStore.addSnack({
        text: err.message,
        color: 'error'
    })
}
</script>