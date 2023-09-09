<template>
  <v-app id="inspire">
      <v-navigation-drawer 
        v-model="drawer"
        app
      >
        <TitleMenu></TitleMenu>
        <v-divider></v-divider>
        <v-list 
        dense
        nav 
        >
          <v-list-item 
            v-for="item in items"
            :key = "item.title"
            :to = "item.to"
            link>
            <ListMenu :title="item.title" :icon="item.icon"></ListMenu>
       </v-list-item>
     </v-list>
      </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title></v-app-bar-title>
    </v-app-bar>

    <v-main>
    <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import TitleMenu from './components/TitleMenu.vue';
  import ListMenu from './components/ListMenu.vue';

  export default {
    name: 'App',
    components: {
      TitleMenu,
      ListMenu,

    },
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Todo', icon:
        'mdi-format-list-checks', to: '/' },
        { title: 'Achieved Tasks', icon:'mdi-check-all', to: '/achieved' }
        ,
        { title: 'Randall Munroe', icon: 'mdi mdi-image', to:'/randallmunroe'}
      ],
       }),
  }
</script>