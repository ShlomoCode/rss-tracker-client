
<template>
    <div>
        <v-card elevation="0" class="mt-2" style="background-color: #fdeeec">
            <v-card-title>
                <h3>
                    <v-icon>
                        mdi-alert-circle-outline
                    </v-icon>
                    שגיאה בטעינת התוכן:
                </h3>
            </v-card-title>
            <v-card-text class="mr-12" style="color: #b71c1c">
                <h3>
                    {{ error }}
                </h3>
            </v-card-text>
        </v-card>
    </div>
</template>
    
    
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    error: {
        type: String,
        required: true
    }
})
const { error } = toRefs(props)
</script>
