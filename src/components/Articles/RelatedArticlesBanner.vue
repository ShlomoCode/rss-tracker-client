<template>
    <v-card elevation="0" :to="{ name: 'ArticlePage', params: { articleId: article.id } }">
        <v-card elevation="0">
            <v-icon>
                mdi-newspaper-variant-outline
            </v-icon>
            <h2>
                {{ shortArticleTitle(article.title) }}
            </h2>
        </v-card>
        <v-divider class="mx-7 mt-5" />
        <v-card-text>
            <p class="text-body-1">
                {{ article.description }}
            </p>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { toRefs } from 'vue'

const $props = defineProps({
    article: {
        type: Object,
        required: true
    }
})

const { article } = toRefs($props)

function shortArticleTitle (title) {
    const limitChars = 100;
    if (title.length > limitChars) {
        return title.slice(0, limitChars - 3) + '...'
    }
    return title
}
</script>