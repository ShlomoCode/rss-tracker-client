<template>
    <v-dialog max-width="500px">
        <v-card>
            <v-card-title>
                יש לך שינויים שלא נשמרו!
            </v-card-title>
            <v-card-text>
                האם אתה בטוח שברצונך לצאת מהדף?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" variant="text" @click="emit('cancel')">
                    ביטול
                </v-btn>
                <v-btn color="green-darken-1" variant="text" @click="leavePage()">
                    כן, צא
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter()
const props = defineProps({
    leaveTo: {
        type: [null, Object]
    }
})
const { leaveTo } = toRefs(props)
const emit = defineEmits(['ok', 'cancel'])

function leavePage () {
    $router.push(leaveTo.value)
    emit('ok')
}
</script>