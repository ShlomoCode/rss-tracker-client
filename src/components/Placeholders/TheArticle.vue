<template>
    <v-col cols="12" md="8">
        <ArticleContentPlaceholder />
    </v-col>
    <v-col cols="12" md="4">
        <RelatedArticlesPlaceholder />
    </v-col>
</template>

<script setup>
import ArticleContentPlaceholder from "@/components/Placeholders/ArticleContent.vue";
import RelatedArticlesPlaceholder from "@/components/Placeholders/RelatedArticles.vue";
</script>