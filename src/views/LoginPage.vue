<template>
  <div>
    <v-slide-x-transition mode="out-in">
      <component :is="activeFormComponent" @toggle-form-show="toggleFormShow()" :nextRoute="$props.nextRoute">
      </component>
    </v-slide-x-transition>
    <Suspense>
      <template #default>
        <StatisticsCard />
      </template>
      <template #fallback>
        <StatisticsCardPlaceholder />
      </template>
    </Suspense>
  </div>
</template>
  
<script setup>
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import StatisticsCard from '@/components/StatisticsCard.vue';
import StatisticsCardPlaceholder from '@/components/StatisticsCardPlaceholder.vue';
import { ref, computed } from 'vue';

const $props = defineProps({
  nextRoute: {
    type: String,
    default: '/'
  },
  register: {
    type: Boolean,
    default: false
  }
})

const activeForm = ref($props.register ? 'RegisterForm' : 'LoginForm');

const toggleFormShow = () => {
  activeForm.value = activeForm.value === 'LoginForm' ? 'RegisterForm' : 'LoginForm';
}

const activeFormComponent = computed(() => {
  return activeForm.value === 'LoginForm' ? LoginForm : RegisterForm;
})
</script>