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
                        <ArticleBanner :article="article" @marked-as-read="removeArticleFromList($event)"
                            :ref="index + 1 === articles.length ? lastArticleElement : null" />
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </template>
            <LoadingMoreCard v-if="loadingMore" />
        </template>
        <template v-else>
            <NotFoundAlert :showTip="false">
                לא נמצאו מאמרים מתאימים להצגה
            </NotFoundAlert>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ArticleBanner from '@/components/Articles/ArticleBanner.vue';
import NotFoundAlert from '@/components/Articles/NotFoundAlert.vue';
import ErrorFetchAlert from '@/components/Articles/ErrorFetchAlert.vue';
import LoadingMoreCard from '@/components/Articles/LoadingMoreCard.vue';
import { useSnacksStore } from '@/stores/snacks';
import axios from '@/services/axios';

const snacksStore = useSnacksStore();

const error = ref('');
const articles = ref([]);
const loadingMore = ref(false);
const totalArticles = ref(0);
const lastArticleElement = ref(null);

try {
    const { data } = await axios.get(`/articles/getUnreadArticles`, {
        params: {
            limit: 10,
        }
    });
    articles.value = data.articles;
    totalArticles.value = data.totalArticles;
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
       const { data } = await axios.get(`/articles/getUnreadArticles`, {
            params: {
                limit: 10,
                offset: articles.value.length
            }
        })
        articles.value = articles.value.concat(data.articles);
        lastArticleFreeze?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
        snacksStore.addSnack({
            text: err.message,
            color: 'error'
        });
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

function removeArticleFromList (articleId) {
    articles.value = articles.value.filter(article => article.id !== articleId);
}
</script>