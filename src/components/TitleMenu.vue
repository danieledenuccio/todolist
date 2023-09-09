<template>
         <v-list-item>
          <v-list-item-content>
          <v-list-item-title class="title">
              Vuetify Todo List
            </v-list-item-title>
          <v-list-item-subtitle v-if="isAuthenticated()">
            Welcome, {{ user }}
            <v-icon class="ml-16 mb-2" @click="toggleAuthenticated()">mdi-logout</v-icon>
          </v-list-item-subtitle>
          </v-list-item-content>
         </v-list-item>
</template>

<script>
import {store} from '@/store'
// import { router } from '@/router'
    export default{
        name: 'TitleMenu',
    data(){
      return{
        user: null,
      }
    },
    methods: {
      isAuthenticated(){
        console.log(store.state.user)
        this.user = store.state.user
        return store.state.user !== null ? true : false
      },
      toggleAuthenticated(){
        store.commit('LogOut')
        this.$router.push("/login");
      }
    }
    };
</script>