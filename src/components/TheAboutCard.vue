<template>
    <v-spacer></v-spacer>
    <v-col cols="12" md="3">
        <v-card class="mx-auto ml-2 mr-2 mt-3">
            <v-card-title>
                <h2>אודות</h2>
                דף זה עוד לא נכתב 😕
                <template v-if="!isLoggedIn">
                    <br>
                    בינתיים אפשר:
                </template>
            </v-card-title>
            <v-card-actions>
                <template v-if="!isLoggedIn">
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
                </template>
                <template v-if="isLoggedIn && isVerified">
                    <v-spacer></v-spacer>
                    <v-btn color="info" :to="{ name: 'SubscriptionsPage' }">
                        <v-icon>
                            mdi-arrow-left-bold-circle-outline
                        </v-icon>
                        לניהול המנויים
                    </v-btn>
                </template>
            </v-card-actions>
        </v-card>
    </v-col>
    <v-spacer></v-spacer>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { isLoggedIn, isVerified } = storeToRefs(userStore);
</script>