<template>
    <v-card :class="{ 'ml-6': !smAndDown, 'mb-1': true }" elevation="0">
        <v-card-title>
            <h3>
                <v-icon>
                    mdi-rss
                </v-icon>
                מאמרים דומים
            </h3>
        </v-card-title>
        <v-divider v-if="smAndDown" class="mx9" />
    </v-card>
    <v-card v-if="articlesRelated.length" :class="{ 'ml-6': !smAndDown, 'mb-0': true }">
        <v-card-text>
            <v-row>
                <template v-for="article in articlesRelated" :key="article.id">
                    <v-col cols="12">
                        <RelatedArticlesBanner :article="article" />
                    </v-col>
                </template>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import RelatedArticlesBanner from '@/components/Articles/Single/RelatedArticlesBanner.vue'
import { toRefs, ref } from 'vue';
import validator from 'validator';
import axios from '@/services/axios';
import { useSnacksStore } from '@/stores/snacks';
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const snacksStore = useSnacksStore();

const $props = defineProps({
    articleId: {
        type: String,
        required: true,
        validator: (value) => validator.isMongoId(value),
    }
})
const { articleId } = toRefs($props);
const articlesRelated = ref([]);

try {
    const { data } = await axios.get(`/articles/related-articles?articleId=${articleId.value}&limit=${smAndDown.value ? 3 : 8}`);
    articlesRelated.value = data.articles;
} catch (error) {
    snacksStore.addSnack({
        text: error.message,
        color: 'error'
    })
}
</script>