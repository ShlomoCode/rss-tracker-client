<template>
    <div>
        <template v-if="articles.length">
            <v-divider></v-divider>
            <h2 class="text-center">
                נמצאו {{ articles.length }} כתבות תחת הפיד "{{ feed.title }}"
            </h2>
            <v-divider></v-divider>
            <ArticleBanner v-for="article in articles" :key="article.id" :article="article" />
        </template>
        <template v-else>
            <NoMatchArticles :error="errorMsg" />
        </template>
    </div>
</template>

<script setup>
import validator from 'validator';
import { toRefs, ref } from 'vue';
import ArticleBanner from '@/components/Articles/Lists/ArticleBanner.vue';
import NoMatchArticles from '@/components/Articles/Lists/NoMatchArticles.vue';
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
const errorMsg = ref('')
try {
    const { data } = await axios.get(`/articles/by-feed-id/${feedId.value}`);
    articles.value = data.articles;
    feed.value = data.feed;
} catch (error) {
    errorMsg.value = error.message;
    snacksStore.addSnack({
        text: error.message,
        color: 'error'
    })
}
</script>