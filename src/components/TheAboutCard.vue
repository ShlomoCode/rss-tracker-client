<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card width="380" class="mx-auto mt-3 mb-3">
                    <v-card-title>
                        <h2>אודות</h2>
                        דף זה עוד לא נכתב 😕
                        <template v-if="!isLoggedIn">
                            <br>
                            בינתיים אפשר:
                        </template>
                    </v-card-title>
                    <template v-if="!isLoggedIn">
                        <v-card-actions>
                            <v-btn color="info" :to="{ name: 'LoginPage' }">
                                <v-icon>
                                    mdi-login
                                </v-icon>
                                להתחבר לחשבון
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="info" :to="{ name: 'LoginPage', query: { register: 1 } }">
                                <v-icon>
                                    mdi-account-plus
                                </v-icon>
                                ליצור חשבון
                            </v-btn>
                        </v-card-actions>
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
</script>