<template>
    <div>
        <v-card class="mx-auto mt-2" elevation="1" :to="{ name: 'ArticlePage', params: { articleId: article.id } }">
            <template v-if="article.image">
                <v-row>
                    <v-col cols="12" sm="4" class="mt-1">
                        <v-card width="95%" height="100%" class="mx-auto" elevation="0">
                            <v-img :src="article.image" :alt="article.title" width="100%" />
                        </v-card>
                    </v-col>
                    <v-col>
                        <h3 class="text-h5 mt-2 ml-1" :class="sm || xs ? 'mr-3' : ''">
                            {{ article.title }}
                        </h3>
                    </v-col>
                </v-row>
            </template>
            <template v-else>
                <h3 class="text-h5 mt-2 ml-1">
                    {{ shortArticleTitle }}
                </h3>
            </template>
            <v-divider v-if="xs" class="mt-4 mx-12" />
            <v-card-text class="overflow-auto" style="max-height: 200px">
                <p class="text-body-1">
                    {{ article.description }}
                </p>
            </v-card-text>
            <v-divider v-if="!xs"></v-divider>
            <v-card-actions>
                <template v-if="!xs">
                    <template v-for="tagName in tagsToDisplay" :key="tagName">
                        <v-expand-transition mode="out-in">
                            <v-chip size="small" class="ma-1" color="blue-darken-1"
                                :to="{ name: 'TagPage', params: { tagName } }"
                                @click.prevent="router.push({ name: 'TagPage', params: { tagName } })">
                                <v-icon class="rotate-180 ml-1">
                                    mdi-label-outline
                                </v-icon>
                                {{ tagName }}
                            </v-chip>
                        </v-expand-transition>
                    </template>
                    <v-spacer></v-spacer>
                    <v-divider v-if="xs" vertical></v-divider>
                    <v-spacer></v-spacer>
                </template>
                <v-spacer></v-spacer>
                <v-btn color="black" class="mr-1" variant="text">
                    <v-icon>
                        mdi-calendar
                    </v-icon>
                    {{ publishDataAgo }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import TimeAgo from 'javascript-time-ago'
import he from 'javascript-time-ago/locale/he'
import { useDisplay } from 'vuetify'

const { sm, xs, lg, smAndDown } = useDisplay()
TimeAgo.addLocale(he)
const timeAgo = new TimeAgo('he-IL')
const props = defineProps({
    article: {
        type: Object,
        required: true,
    }
})

const { article } = toRefs(props)

const shortArticleTitle = computed(() => {
    const limitChars = 80
    if (article.value.title.length > limitChars) {
        return article.value.title.slice(0, limitChars - 3) + '...'
    }
    return article.value.title
})

const publishDataAgo = computed(() => {
    const date = new Date(article.value.published)
    return timeAgo.format(date)
})

const tagsToDisplay = computed(() => {
    let limitTags;
    if (smAndDown.value) {
        limitTags = 4
    } else if (lg.value) {
        limitTags = 6
    } else {
        limitTags = 5
    }
    return article.value.tags.filter(tagName => tagName.length <= 16).slice(0, limitTags);
})
</script>