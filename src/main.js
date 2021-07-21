import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/app.css'
import Vuex from 'vuex'
import VueCompositionAPI from '@vue/composition-api'
import {store} from './store/store'

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

Vue.use(VueCompositionAPI)
Vue.use(Vuex)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
