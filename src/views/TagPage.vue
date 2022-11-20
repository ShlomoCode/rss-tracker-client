<template>
    <div class="ma-1 mt-2" :class="smAndDown ? 'text-h6' : 'text-h5'">
        <router-link :to="{ name: 'TagsPage' }" class="text-decoration-none" style="color: #4674ea;">
            תגיות
        </router-link>
        /
        {{ tagName }}
    </div>
    <div :key="tagName">
        <Suspense>
            <template #default>
                <TheTag :tag-name="tagName" :key="tagName" />
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
import { toRefs } from 'vue';
import TheTag from '@/components/Articles/TheTag.vue';
import ArticleBannerPlaceholder from '@/components/Placeholders/ArticleBanner.vue';
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay();
const $props = defineProps({
    tagName: {
        type: String,
        required: true,
    }
})

const { tagName } = toRefs($props);
document.title = `Rss Tracker - ${tagName.value}`;
</script>
