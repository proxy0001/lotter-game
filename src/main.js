import './assets/stylesheets/_bootstrap.scss'
import Vue from 'vue'
import App from './App.vue'

import Pool from './components/pool'
import Ball from './components/ball'
import BarChart from './components/bar-chart'

Vue.component('pool', Pool )
Vue.component('ball', Ball )
Vue.component('bar-chart', BarChart )

new Vue({
  el: '#app',
  render: h => h(App),
})

