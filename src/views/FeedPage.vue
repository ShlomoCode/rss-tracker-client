<template>
    <div :key="feedId">
        <Suspense>
            <template #default>
                <TheFeed :feed-id="feedId" :key="feedId" />
            </template>
            <template #fallback>
                <div>
                    <v-progress-linear color="green" indeterminate />
                    <ArticleBannerPlaceholder v-for="n in 5" :key="n" />
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import validator from 'validator';
import { toRefs } from 'vue';
import TheFeed from '@/components/Articles/TheFeed.vue';
import ArticleBannerPlaceholder from '@/components/Placeholders/ArticleBanner.vue';

const $props = defineProps({
    feedId: {
        type: String,
        required: true,
        validator: (value) => validator.isMongoId(value),
    }
})

const { feedId } = toRefs($props);
</script>