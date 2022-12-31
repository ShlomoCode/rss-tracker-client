<template>
    <template v-if="isNotFound">
        <NotFoundAlert>
            המאמר לא נמצא
        </NotFoundAlert>
    </template>
    <template v-else-if="error">
        <ErrorPage :error="error" />
    </template>
    <template v-else>
        <v-row>
            <v-col cols="12" md="8">
                <ArticleContent :article="article" @content-height="articleContentHeight = $event" />
            </v-col>
            <v-col cols="12" md="4">
                <RelatedArticles :articleId="article.id" :articleContentHeight="articleContentHeight" />
            </v-col>
        </v-row>
    </template>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import validator from 'validator';
import axios from '@/services/axios';
import { useSnacksStore } from '@/stores/snacks';

import ArticleContent from '@/components/Articles/ArticleContent.vue'
import RelatedArticles from '@/components/Articles/RelatedArticles.vue'
import NotFoundAlert from '@/components/Articles/NotFoundAlert.vue';
import ErrorPage from '@/components/Articles/ErrorFetchAlert.vue';

const snacksStore = useSnacksStore();
const props = defineProps({
    articleId: {
        type: String,
        required: true,
        validator: (value) => validator.isMongoId(value),
    }
})

const { articleId } = toRefs(props)
const article = ref({})
const isNotFound = ref(false)
const error = ref('')
const articleContentHeight = ref(0)

try {
    const { data } = await axios.get(`/articles/getArticleById/${articleId.value}`);
    article.value = data.article;
    document.title = `Rss Tracker - ${article.value.title}`;
} catch (err) {
    if (err.response && err.response.status === 404) {
        isNotFound.value = true;
    } else {
        error.value = err.message;
        snacksStore.addSnack({
            text: err.message,
            color: 'error'
        })
    }
}
</script>