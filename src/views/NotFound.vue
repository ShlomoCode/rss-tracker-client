<template>
    <v-card width="500" class="mx-auto mt-6">
        <v-card-title class="text-h5">
            😱 אוי לא - הדף לא קיים!
        </v-card-title>
        <v-card-text>
            הדף שאתה מנסה לגשת אליו לא נמצא. יש מצב שהכתובת שגויה?
        </v-card-text>
        <v-card-actions>
            <v-col cols="12" class="text-left">
                <v-btn color="primary" text left @click="$router.push({ name: 'HomePage' })">
                    <v-icon>
                        mdi-home
                    </v-icon>
                    קח אותי מפה!
                </v-btn>
            </v-col>
        </v-card-actions>
    </v-card>
</template>