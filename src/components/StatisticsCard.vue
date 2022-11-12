<template>
    <v-slide-x-transition mode="out-in">
        <v-row justify="center">
            <v-col v-for="statistic in statistics" :key="statistic" cols="12" md="3">
                <v-card>
                    <v-card-title>
                        <h3 class="text-center">
                            <v-icon>{{ statistic.icon }}</v-icon>
                            {{ statistic.value }}
                        </h3>
                        <h4 class="text-center">
                            {{ statistic.title }}
                        </h4>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-slide-x-transition>
</template>

<script setup>
import axios from '@/services/axios'
const { data } = await axios.get('/general/statistics')
const statistics = [
    {
        icon: 'mdi-account-group',
        value: data.usersCount,
        title: 'משתמשים רשומים'
    },
    {
        icon: 'mdi-rss',
        value: data.feedsCount,
        title: 'פידים במערכת'
    },
    {
        icon: 'mdi-bell',
        value: data.feedsSubscribersCount,
        title: 'מנויים לפידים'
    }
];
</script>