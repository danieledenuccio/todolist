import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../views/TodoList.vue'
import { store } from '@/store/index'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name: 'Login',
    component: () => import('../LoginPage.vue')
  },
  // {
  //   // /search/screens -> /search?q=screens
  //   path: '/',
  //   redirect: to => {
  //     // the function receives the target route as the argument
  //     // we return a redirect path/location here.
  //     return { path: '/search', query: { q: to.params.searchText } }
  //   }
  //   },
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
  },
  {
    path: '/achieved',
    name: 'achieved',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AchievedTasks.vue')
  },
  {
    path: '/randallmunroe',
    name: 'RandallMunroe',
    component: () => import('../views/RandallMunroe.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  // Assumi che isAuthenticated sia un valore booleano che indica se l'utente è autenticato

  // Se l'utente è autenticato, continua con la navigazione
  if (store.getters.isAuthenticated) {
    next(); // Continua con la navigazione
  } else {
    // Se l'utente non è autenticato e sta cercando di accedere a una pagina diversa da 'Login', reindirizza alla pagina di login
    if (to.name !== 'Login') {
      next({ name: 'Login' });
    } else {
      // Se l'utente non è autenticato ma sta cercando di accedere alla pagina di login, consenti la navigazione
      next();
    }
  }
});

export default router
