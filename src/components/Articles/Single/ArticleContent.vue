<template>
    <v-card :class="{ 'mr-5': !smAndDown }">
        <v-card-text>
            <template v-if="smAndDown">
                <h2 class="text-center">
                    {{ article.title }}
                </h2>
            </template>
            <template v-else>
                <h1 class="text-center" style="line-height: 1.1">
                    {{ article.title }}
                </h1>
            </template>
        </v-card-text>
        <v-divider class="mb-2" />
        <v-card width="82%" class="mx-auto">
            <v-img :src="article.image" :alt="article.title" width="100%" />
        </v-card>
        <v-card-text class="text-center">
            <v-icon>
                mdi-calendar-clock
            </v-icon>
            {{ articleDate }}
            |
            <v-icon> mdi-account</v-icon>
            {{ article.author }}
            |
            <v-icon>
                mdi-newspaper-variant-outline
            </v-icon>
            <a color="success" :href="article.url" target="_blank" rel="noopener noreferrer"
                class="text-decoration-none text-black">
                מקור
            </a>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-center">
            <template v-for="tag in article.tags" :key="tag">
                <v-chip size="small" :class="smAndDown ? 'ma-1 mx-2' : 'mx-2'" color="blue-darken-1"
                    @click="openTagPage(tag)">
                    <v-icon class="rotate">
                        mdi-label-outline
                    </v-icon>
                    {{ tag }}
                </v-chip>
            </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="mr-3">
            <p class="text-body-1 article-content" v-html="article.content" />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify'
import TimeAgo from 'javascript-time-ago'
import he from 'javascript-time-ago/locale/he'
TimeAgo.addLocale(he)
const timeAgo = new TimeAgo('he-IL')

const { smAndDown } = useDisplay()
const $router = useRouter();

function openTagPage (tagName) {
    $router.push({ name: 'TagPage', params: { tagName } })
}

const $props = defineProps({
    article: {
        type: Object,
        required: true,
    }
})
const { article } = toRefs($props)

const articleDate = computed(() => {
    const date = new Date(article.value.published)
    return timeAgo.format(date)
})
</script>

<style>
.article-content img {
    width: 50% !important;
    height: 50% !important;
}
</style>