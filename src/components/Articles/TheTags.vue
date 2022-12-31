<template>
    <template v-if="error">
        <ErrorFetchAlert :error="error" />
    </template>
    <template v-else-if="tags.length">
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="10" sm="3" md="2" :class="{    'ml-8': !xsAndDown    }">
                <v-text-field v-model.trim="search" variant="underlined" label="חיפוש" inputmode="search"
                    prepend-inner-icon="mdi-magnify" append-inner-icon="mdi-close" @click:append-inner="search = ''" />
            </v-col>
            <v-spacer v-if="xsAndDown"></v-spacer>
        </v-row>
        <div class="ml-7 mr-6">
            <v-card class="pa-3">
                <template v-for="tag in filteredTags" :key="tag.name">
                    <v-chip class="ma-1 mb-3 ml-2" color="blue-darken-1"
                        :to="{ name: 'TagPage', params: { tagName: tag.name } }"
                        @click.prevent="router.push({ name: 'TagPage', params: { tagName: tag.name } })">
                        <v-icon class="rotate-180 ml-1">
                            mdi-label-outline
                        </v-icon>
                        {{ tag.name }} ({{ tag.count }})
                    </v-chip>
                </template>
            </v-card>
        </div>
    </template>
    <template v-else>
        <v-card elevation="0" style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5">
            <v-card-title class="text-h5">
                לא נמצאו תגיות
            </v-card-title>
        </v-card>
    </template>
</template>

<script setup>
import { ref, computed } from 'vue';
import ErrorFetchAlert from '@/components/Articles/ErrorFetchAlert.vue';
import axios from '@/services/axios';
import { useDisplay } from 'vuetify';

const { xsAndDown } = useDisplay();
const error = ref('');
const tags = ref([]);
const search = ref('');

try {
    const { data } = await axios.get('/articles/getTagsList');
    tags.value = data.tags
} catch (err) {
    error.value = err.message
}

const filteredTags = computed(() => {
    if (!search.value) return tags.value;
    return tags.value.filter(tag => tag.name.includes(search.value));
});
</script>