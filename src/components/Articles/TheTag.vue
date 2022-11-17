<template>
    <div>
        <template v-if="error">
            <ErrorFetchAlert :error="error" />
        </template>
        <template v-else-if="articles.length">
            <v-divider></v-divider>
            <h2 class="text-center">
                נמצאו {{ articles.length }} כתבות תחת התגית "{{ tagName }}"
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
import { toRefs, ref } from 'vue';
import ArticleBanner from '@/components/Articles/ArticleBanner.vue';
import NotFoundAlert from '@/components/Articles/NotFoundAlert.vue';
import ErrorFetchAlert from '@/components/Articles/ErrorFetchAlert.vue';
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
const error = ref('');

try {
    const { data } = await axios.get(`/articles/by-tag-name?tagName=${tagName.value}`);
    articles.value = data.articles;
} catch (err) {
    error.value = err.message;
    snacksStore.addSnack({
        text: err.message,
        color: 'error'
    })
}
</script>