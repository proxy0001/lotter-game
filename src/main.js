import Vue from 'vue'

// ES build is more efficient by reducing unneeded components with tree-shaking.
// (Needs Webpack 2 or Rollup)
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

// Import styles if style-loader is available
// You have to manually add css files if lines below are not working
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Globally register components
Vue.use(BootstrapVue);


import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
