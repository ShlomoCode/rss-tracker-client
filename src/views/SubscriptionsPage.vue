<template>
    <div>
        <SubscriptionsToolBar @search="search = $event" @show-only-subs="showOnlySubs = $event" />
        <Suspense>
            <template #default>
                <SubscriptionsList :search="search" :show-only-subs="showOnlySubs" />
            </template>
            <template #fallback>
                <SubscriptionsListPlaceholder />
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SubscriptionsToolBar from '@/components/SubscriptionsToolBar.vue'
import SubscriptionsList from '@/components/SubscriptionsList.vue'
import SubscriptionsListPlaceholder from '@/components/Placeholders/SubscriptionsList.vue'

const search = ref('')
const showOnlySubs = ref(false)
</script>