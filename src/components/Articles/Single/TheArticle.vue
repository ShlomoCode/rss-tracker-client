<template>
    <template v-if="!errorMsg">
        <v-row>
            <v-col cols="12" md="8" lg="8" xs="12">
                <ArticleContent :article="article" />
            </v-col>
            <v-col cols="12" md="4" lg="4" xs="12">
                <RelatedArticles :articleId="article.id" />
            </v-col>
        </v-row>
    </template>
    <template v-else>
        <NoMatchArticles :error="errorMsg" />
    </template>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import validator from 'validator';
import axios from '@/services/axios';
import { useSnacksStore } from '@/stores/snacks';

import ArticleContent from '@/components/Articles/Single/ArticleContent.vue'
import RelatedArticles from '@/components/Articles/Single/RelatedArticles.vue'
import NoMatchArticles from '@/components/Articles/Lists/NoMatchArticles.vue';

const snacksStore = useSnacksStore();
const $props = defineProps({
    articleId: {
        type: String,
        required: true,
        validator: (value) => validator.isMongoId(value),
    }
})

const { articleId } = toRefs($props)
const article = ref({})
const errorMsg = ref('')

try {
    const { data } = await axios.get(`/articles/${articleId.value}`);
    article.value = data.article;
} catch (error) {
    errorMsg.value = error.message;
    snacksStore.addSnack({
        text: error.message,
        color: 'error'
    })
}
</script>