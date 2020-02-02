import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta'
import RouteJson from './components/RouteJson';
import RouteSQL from './components/RouteSQL';
import RouteString from './components/RouteString';
import RouteGolang from './components/RouteGolang';
import CodeMirror from 'vue-codemirror-lite'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/go/go'
import VueClipboard from 'vue-clipboard2'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/xml-fold'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/display/placeholder'
import VueResource from 'vue-resource'
import 'codemirror/theme/idea.css'
import RouteTime from './components/RouteTime'
import RouteDiff from './components/RouteDiff'
import Route404 from './components/Route404'

Vue.use(VueMeta)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(CodeMirror)
Vue.use(VueClipboard)
Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.rightTop
  },
})
Vue.use(VueResource)

const routes = [
  { path: '/', component: RouteJson },
  { path: '/json*', component: RouteJson },
  { path: '/sql*', component: RouteSQL },
  { path: '/string*', component: RouteString },
  { path: '/golang*', component: RouteGolang },
  { path: '/time*', component: RouteTime },
  { path: '/diff*', component: RouteDiff },
  { path: '/404', component: Route404},
  { path: '*', redirect: '/404'},
]

const router = new VueRouter({
  mode: 'history',
  routes
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
