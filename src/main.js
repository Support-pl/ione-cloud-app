import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueGoogleCharts from 'vue-google-charts'
import i18n from './i18n'
import store from './store'
import router from './router'
import './registerServiceWorker'
import axios from './axios'
import config from './appconfig'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueGoogleCharts)

Vue.prototype.$config = config;
Vue.prototype.$axios = axios;

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('replace', function (value, from, to) {
  if (!value) return ''
  value = value.toString()
  return value.replace(from, to)
})

new Vue({
  i18n,
	router,
	store,
  render: h => h(App)
}).$mount('#app')