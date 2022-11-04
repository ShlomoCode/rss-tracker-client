<template>
    <div>
        <template v-if="articles.length">
            <v-divider></v-divider>
            <h2 class="text-center">
               נמצאו {{ articles.length }} כתבות תחת התגית "{{ tagName }}"
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
import { toRefs, ref } from 'vue';
import ArticleBanner from '@/components/Articles/Lists/ArticleBanner.vue';
import NoMatchArticles from '@/components/Articles/Lists/NoMatchArticles.vue';
import axios from '@/services/axios';
import { useSnacksStore } from '@/stores/snacks';

const snacksStore = useSnacksStore();

const $props = defineProps({
    tagName: {
        type: String,
        required: true,
    }
})

const { tagName } = toRefs($props);

const articles = ref([]);
const errorMsg = ref('');
try {
    const { data } = await axios.get(`/articles/by-tag-name?tagName=${tagName.value}`);
    articles.value = data.articles;
} catch (error) {
    errorMsg.value = error.message;
    snacksStore.addSnack({
        text: error.message,
        color: 'error'
    })
}
</script>