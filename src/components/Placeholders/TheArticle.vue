<template>
    <v-col cols="12" md="6" lg="8" xs="12">
        <ArticleContentPlaceholder />
    </v-col>
    <v-col cols="12" md="6" lg="4" xs="12">
        <RelatedArticlesPlaceholder />
    </v-col>
</template>

<script setup>
import ArticleContentPlaceholder from "@/components/Placeholders/ArticleContent.vue";
import RelatedArticlesPlaceholder from "@/components/Placeholders/RelatedArticles.vue";
</script>