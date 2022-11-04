<template>
    <div :key="articleId">
        <Suspense>
            <template #default>
                <SingleArticle :article-id="articleId" :key="articleId" />
            </template>
            <template #fallback>
                <div>
                    <v-row>
                        <v-col cols="12">
                            <v-progress-linear color="green" indeterminate />
                        </v-col>
                        <SingleArticlePlaceholder />
                    </v-row>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import validator from 'validator';
import { toRefs } from 'vue';
import SingleArticle from '@/components/Articles/Single/TheArticle.vue'
import SingleArticlePlaceholder from '@/components/Placeholders/TheArticle.vue';

const $props = defineProps({
    articleId: {
        type: String,
        required: true,
        validator: (value) => validator.isMongoId(value),
    }
});
const { articleId } = toRefs($props);
</script>
