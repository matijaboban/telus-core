import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {
    path: '/',
    component: require('./vuejs/home.vue'),
    name: 'home'
  },
  {
    path: '/sec',
    component: require('./vuejs/sec.vue'),
    name: 'sec'
  },
  {
    path: '*',
    redirect: '/'
  }
]

var router = new VueRouter({
  mode: 'history',
  routes
})

var app = new Vue({
  el: '#app',
  router,
  render: h => h(require('./app.vue'))
})
