import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router';
import RouteJson from './components/RouteJson';
import RouteSQL from './components/RouteSQL';
import RouteString from './components/RouteString';
import RouteGolang from './components/RouteGolang';
import CodeMirror from 'vue-codemirror-lite'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(CodeMirror)

const routes = [
  { path: '/', component: RouteJson },
  { path: '/json', component: RouteJson },
  { path: '/sql', component: RouteSQL },
  { path: '/string', component: RouteString },
  { path: '/golang', component: RouteGolang },
]

const router = new VueRouter({
  routes
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
