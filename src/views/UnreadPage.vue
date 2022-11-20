<template>
    <div>
        <Suspense>
            <template #default>
                <TheUnread />
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
import TheUnread from '@/components/Articles/TheUnread.vue';
import ArticleBannerPlaceholder from '@/components/Placeholders/ArticleBanner.vue';
</script>
