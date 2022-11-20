<template>
    <v-card elevation="0" :to="{ name: 'ArticlePage', params: { articleId: article.id } }">
        <v-card elevation="0">
            <v-row v-if="!mdAndDown" class="ma-1">
                <v-col cols="5">
                    <v-icon size="small">
                        mdi-calendar
                    </v-icon>
                    {{ publishDataAgo }}
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4">
                    <v-btn :href="article.url" target="_blank" color="black" variant="plain" size="small" style="opacity: 1" class="text-lowercase"
                        @click.prevent="openSource">
                        <v-icon>
                            mdi-web
                        </v-icon>
                        {{ host }}
                    </v-btn>
                </v-col>
            </v-row>
            <h2 class="mx-1">
                {{ shortTitle }}
            </h2>
        </v-card>
        <v-divider v-if="!last || article.description" class="mx-3 mt-4 mb-2" />
        <v-card-text v-if="article.description">
            <p class="text-body-1">
                {{ article.description }}
            </p>
        </v-card-text>
        <v-card-actions v-if="md">
            <v-spacer></v-spacer>
            <v-icon size="small">
                mdi-calendar
            </v-icon>
            {{ publishDataAgo }}
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { toRefs, computed } from 'vue'
import TimeAgo from 'javascript-time-ago'
import he from 'javascript-time-ago/locale/he'
TimeAgo.addLocale(he)

const { md, mdAndDown } = useDisplay()
const $props = defineProps({
    article: {
        type: Object,
        required: true
    },
    last: {
        type: Boolean,
        default: false
    }
})

const timeAgo = new TimeAgo('he-IL')
const { article, last } = toRefs($props)

const publishDataAgo = computed(() => {
    const date = new Date(article.value.published)
    return timeAgo.format(date)
})

const shortTitle = computed(() => {
    const limitChars = 100;
    if (article.value.title.length > limitChars) {
        return article.value.title.slice(0, limitChars - 3) + '...'
    }
    return article.value.title
})

const host = computed(() => {
    return new URL(article.value.url).host
})

function openSource () {
    window.open(article.value.url, '_blank')
}
</script>