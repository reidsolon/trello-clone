import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import '@popperjs/core'
import './assets/app.css'

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
window.Popper = require('@popperjs/core')

import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
