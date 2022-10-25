<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h3>

                    <v-card width="380" class="mx-auto mt-3 mb-3">
                        <v-card-title>
                            <h1 class="text-h4">אודות</h1>
                            דף זה עוד לא נכתב 😕
                            <br>
                            בינתיים אפשר:
                        </v-card-title>
                        <v-card-actions>
                            <v-btn color="info" :to="{ name: 'LoginPage' }">
                                <v-icon>mdi-login</v-icon>
                                להתחבר לחשבון
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="info" :to="{ name: 'LoginPage', query: { register: 1 } }">
                                <v-icon>mdi-account-plus</v-icon>
                                ליצור חשבון
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </h3>
            </v-col>
        </v-row>
    </v-container>
</template>