import './assets/stylesheets/_bootstrap.scss'
import Vue from 'vue'
import App from './app.vue'

import Pool from './components/pool'
import Ball from './components/ball'

Vue.component('pool', Pool )
Vue.component('ball', Ball )

new Vue({
  el: '#app',
  render: h => h(App)
})
