<template>
    <v-card width="500" class="mx-auto mt-6">
        <v-card-title class="text-h5">
            😱 אוי לא - הדף לא קיים!
        </v-card-title>
        <v-card-text>
            הדף שאתה מנסה לגשת אליו לא נמצא. יש מצב שהכתובת שגויה?
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" location="left" @click="router.push({ name: 'HomePage' })">
                <v-icon>
                    mdi-home
                </v-icon>
                קח אותי מפה!
            </v-btn>
        </v-card-actions>
    </v-card>
</template>