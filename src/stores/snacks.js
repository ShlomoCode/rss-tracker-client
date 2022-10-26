import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useSnacksStore = defineStore('snacks', () => {
    let snacksId = 0;
    const snacks = reactive([]);

    const addSnack = (snackbar) => {
        snacksId++
        snacks.push({
            id: snacksId,
            show: true,
            text: "אופס, משהו השתבש",
            type: "error",
            color: snackbar.type || "red",
            timeout: 2500,
            multiLine: false,
            bottom: !snackbar.right && !snackbar.top && !snackbar.left ? true : false,
            ...snackbar // override defaults
        });
    }

    return {
        snacks,
        addSnack
    }
})
