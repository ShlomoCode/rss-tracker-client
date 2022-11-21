<template>
    <div style="filter: blur(7px);">
        <v-card :class="{ 'ml-6': !smAndDown, 'mb-1': true }" elevation="0" variant="outlined">
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
        <v-card :class="{ 'ml-6': !smAndDown, 'mb-0': true }">
            <v-card-text>
                <v-row>
                    <template v-for="article in 3" :key="article">
                        <v-col cols="12">
                            <RelatedArticlesBannerPlaceholder />
                        </v-col>
                    </template>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import RelatedArticlesBannerPlaceholder from '@/components/Placeholders/RelatedArticlesBanner.vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
</script>