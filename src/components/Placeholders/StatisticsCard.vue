<template>
    <v-row justify="center">
        <v-col v-for="statistic in statistics" :key="statistic" cols="12" md="3">
            <v-card>
                <v-card-title style="filter: blur(4px);">
                    <h3 class="text-center">
                        <v-icon>{{ statistic.icon }}</v-icon>
                        XX
                    </h3>
                    <h4 class="text-center">
                        {{ statistic.title }}
                    </h4>
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
const statistics = [
    {
        icon: 'mdi-account-group',
        title: 'משתמשים רשומים'
    },
    {
        icon: 'mdi-rss',
        title: 'פידים במערכת'
    },
    {
        icon: 'mdi-bell',
        title: 'מנויים לפידים'
    }
];
</script>