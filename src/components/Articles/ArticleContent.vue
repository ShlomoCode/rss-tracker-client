<template>
    <div ref="articleContentElement">
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
            <v-card width="80%" class="mx-auto mt-1" variant="text">
                <p class="text-subtitle-2 text-center article-description">
                    {{ article.description }}
                </p>
            </v-card>
            <v-card class="text-center ma-3 mt-2" variant="text">
                <v-icon>
                    mdi-calendar-clock
                </v-icon>
                {{ publishDataAgo }}
                |
                <v-icon> mdi-account</v-icon>
                {{ article.author }}
                |
                <a :href="article.url" target="_blank" rel="noopener noreferrer"
                    class="text-decoration-none text-black text-body-1 mr-1">
                    <v-icon class="rotate-270">
                        mdi-open-in-new
                    </v-icon>
                    {{ articleHost }}
                </a>
            </v-card>
            <v-divider></v-divider>
            <v-card-text class="text-center">
                <template v-for="tagName in article.tags" :key="tagName">
                    <v-chip size="small" :class="smAndDown ? 'ma-1 mx-2' : 'mx-2'" color="blue-darken-1"
                        :to="{ name: 'TagPage', params: { tagName } }">
                        <v-icon class="rotate-180 ml-1">
                            mdi-label-outline
                        </v-icon>
                        {{ tagName }}
                    </v-chip>
                </template>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="mx-3">
                <div class="text-body-1 article-content" v-html="article.content" />
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { toRefs, computed, watch, ref } from 'vue'
import { useDisplay } from 'vuetify'
import TimeAgo from 'javascript-time-ago'
import he from 'javascript-time-ago/locale/he'
TimeAgo.addLocale(he)
const timeAgo = new TimeAgo('he-IL')

const { smAndDown } = useDisplay()

const $props = defineProps({
    article: {
        type: Object,
        required: true,
    }
})
const { article } = toRefs($props)

const publishDataAgo = computed(() => {
    const date = new Date(article.value.published)
    return timeAgo.format(date)
})

const $emit = defineEmits(['content-height'])
const articleContentElement = ref(null)
const contentHeight = computed(() => articleContentElement.value?.clientHeight);
watch(contentHeight, (height) => {
    $emit('content-height', height)
});

const articleHost = computed(() => {
    const url = new URL(article.value.url)
    return url.hostname
})
</script>

<style>
.article-content img {
    width: 50% !important;
    height: 50% !important;
}
</style>