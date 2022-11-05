<template>
    <div>
        <template v-if="!error">
            <v-card>
                <v-card-title class="text-h5">אין מאמרים מתאימים להצגה</v-card-title>
                <v-card-text>
                    שים לב שהמאמרים נמחקים אוטומטית ולצמיתות לאחר 14 יום
                </v-card-text>
            </v-card>
        </template>
        <template v-else>
            <v-col cols="11">
                <v-card color="red-lighten-2" class="mt-2 mr-5 mt-3">
                    <v-card-title>
                        <h3>
                            <v-icon>
                                mdi-alert-circle-outline
                            </v-icon>
                            שגיאה בטעינת התוכן
                        </h3>
                    </v-card-title>
                    <v-card-text>
                        <h3>
                            {{ error }}
                        </h3>
                    </v-card-text>
                </v-card>
            </v-col>
        </template>
    </div>
</template>

<script setup>
import { toRefs } from 'vue'

const $props = defineProps(['error'])
const { error } = toRefs($props)
</script>