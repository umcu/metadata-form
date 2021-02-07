// basic setup with Vuex store
import Vue from 'vue'
Vue.config.productionTip = false
import store from './store'
import App from './App.vue'

// Bootstrap Vue with its icons
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// custom CSS
import './custom.scss'

// start application
const app = new Vue({store: store, render: h => h(App)});
app.$mount('#app')
