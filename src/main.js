import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import i18n from './i18n'
import store from './store'
import router from './router'
import './registerServiceWorker'
import axios from './axios'
import config from './appconfig'

Vue.config.productionTip = false
Vue.use(Antd)

Vue.prototype.$config = config;
Vue.prototype.$axios = axios;

new Vue({
  i18n,
	router,
	store,
  render: h => h(App)
}).$mount('#app')