<template>
    <v-card :class="[smAndDown ? '' : 'ml-6', 'mb-1']" elevation="0">
        <v-card-title>
            <h3>
                <v-icon>
                    mdi-newspaper-variant-multiple-outline
                </v-icon>
                מאמרים דומים
            </h3>
        </v-card-title>
        <v-divider v-if="smAndDown" class="mx9" />
    </v-card>
    <v-card v-if="articlesRelated.length" :class="[smAndDown? '' : 'ml-6', 'mb-0']">
        <v-card-text>
            <v-row>
                <template v-for="(article, index) in articlesRelatedToDisplay" :key="article.id">
                    <v-col cols="12">
                        <RelatedArticlesCard :article="article" :last="index + 1 === articlesRelatedToDisplay.length" />
                    </v-col>
                </template>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import RelatedArticlesCard from '@/components/Articles/RelatedArticlesCard.vue'
import { toRefs, ref, computed } from 'vue';
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
    },
    articleContentHeight: {
        type: Number,
        required: true,
    }
})
const { articleId, articleContentHeight } = toRefs($props);
const articlesRelated = ref([]);

try {
    const { data } = await axios.get(`/articles/getRelatedArticles?articleId=${articleId.value}&limit=8`);
    articlesRelated.value = data.articles;
} catch (error) {
    snacksStore.addSnack({
        text: error.message,
        color: 'error'
    })
}

const articlesRelatedToDisplay = computed(() => {
    const countByContentHeight = Math.round(articleContentHeight.value / 140);
    return articlesRelated.value.slice(0, smAndDown.value ? 3 : Math.max(countByContentHeight, 2)).sort((a, b) => {
        return new Date(b.published) - new Date(a.published)
    });
})
</script>