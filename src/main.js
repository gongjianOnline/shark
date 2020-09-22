import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { Button,Popup } from 'vant';
import 'vant/lib/index.css';
Vue.use(Button).use(Popup);

import axios from "axios";
Vue.prototype.$ajax = axios;

import "./assets/menuIcon/iconfont.css"

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
