<template >
    <v-card elevation="0" max-width="500">
        <div class="text-center">
            <h1 class="mb-2">Login</h1>
        </div>
       <v-form @submit.prevent="login"> 
            <v-text-field
            v-model="userName"
            label="Enter your username"
            name="username"
                    prepend-inner-icon="mdi-login"
                    type="text"
                    class="rounded-0"
                    outlined
                ></v-text-field>
                <v-btn type="submit" class="rounded-0" color="#000000" x-large block dark>Login</v-btn>
            </v-form>
        </v-card>
    </template>
  <script>
import { db } from '@/firebase';
import { store } from '@/store';
import router from '@/router'

const userList = db.collection('users');  
export default {
  name: 'LoginPage',
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    login() {
      if(this.userName.trim()!== ''){
        userList
        .where('name', '==', this.userName)
        .get()
        .then((doc) => {
          if (doc.size > 0 ) {
            console.log('Username già presente nel database. ', doc);
            store.commit('setUser', this.userName);
            router.push('/')
          } else {
            console.log('Username non presente nel database.');
            store.commit('setUser', this.userName);
            userList
            .add({
              name: this.userName,
              // online: true
            })
            .then(() => {
              console.log("FATTAAAAAAAAAA")
              console.log(db.collection('users'))
              router.push('/')
            })
            .catch((error) => {
            console.log("NON FATTAAAAAAAAAA")
            console.error("Error creating new task:", error);
          });
    }
  })
  .catch((error) => {
    console.error('Errore nella query:', error);
  });

  console.log(store.state.user)
}else{
  this.userName = '';
}
    store.commit('setUser', this.userName);
        },
      }
  }
  </script>