<template>
    <div>
        <v-row>
            <v-progress-linear color="green" indeterminate></v-progress-linear>
            <v-col v-for="n in 5" :key="n" cols="12" sm="6" md="4" lg="3" style="filter: blur(7px);">
                <v-card class="ma-1">
                    <v-card-title>
                        <h3>
                            לורם איפסום דולור
                        </h3>
                        <v-chip class="ma-2" color="indigo" text-color="white" prepend-icon="mdi-link">
                            לורם איפסום
                        </v-chip>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success">
                            <v-icon>mdi-bell-plus</v-icon>
                            לורם איפסום דולור
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>