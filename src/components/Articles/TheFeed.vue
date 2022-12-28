<template>
    <div>
        <template v-if="error">
            <ErrorFetchAlert :error="error" />
        </template>
        <template v-else-if="articles.length">
            <template v-for="(article, index) in articles" :key="article.id">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="6">
                        <ArticleBanner :article="article"
                            :ref="index + 1 === articles.length ? lastArticleElement : null" />
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </template>
            <LoadingMoreCard v-if="loadingMore" />
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
import LoadingMoreCard from '@/components/Articles/LoadingMoreCard.vue';
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
const loadingMore = ref(false);
const totalArticles = ref(0);
const lastArticleElement = ref(null);

try {
    if (!validator.isMongoId(feedId.value)) throw new Error('כתובת הפיד אינה תקינה');
    const { data } = await axios.get(`/articles/getArticlesByFeedId`, {
        params: {
            feedId: feedId.value,
            limit: 10,
        }
    });
    articles.value = data.articles;
    totalArticles.value = data.totalArticles;
    feed.value = data.feed;
    document.title = `Rss Tracker - ${feed.value.title}`;
} catch (err) {
    error.value = err.message;
    snacksStore.addSnack({
        text: err.message,
        color: 'error'
    })
}

const blockLoadMore = ref(false);
async function loadMore () {
    loadingMore.value = true;
    const lastArticleFreeze = lastArticleElement.value;
    try {
        const { data } = await axios.get(`/articles/getArticlesByFeedId`, {
            params: {
                feedId: feedId.value,
                limit: 10,
                offset: articles.value.length
            }
        });
        articles.value = articles.value.concat(data.articles);
        lastArticleFreeze?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
        snacksStore.addSnack({
            text: err.message,
            color: 'error'
        })
        blockLoadMore.value = true;
        setTimeout(() => {
            blockLoadMore.value = false;
        }, 700)
    } finally {
        loadingMore.value = false;
    }
}

window.addEventListener('scroll', () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if ((scrollTop + clientHeight) >= scrollHeight) {
        if (!loadingMore.value && articles.value.length < totalArticles.value) {
            if (blockLoadMore.value || loadingMore.value) return;
            loadMore();
        }
    }
});
</script>