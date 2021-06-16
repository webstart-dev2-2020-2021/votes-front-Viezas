import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Vote from '../views/Vote.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vote',
    name: 'CreateVote',
    component: Vote,
    beforeEnter: (to, from, next) => {
      if(!store.getters.user.token)
      {
        return next({name : 'Login'})
      }
      next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.getters.user.token)
      {
        return next({name : 'Votes'})
      }
      next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(store.getters.user.token)
      {
        return next({name : 'Votes'})
      }
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
