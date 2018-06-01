// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
/*import Home from './components/HelloFromVux'*/
import router from './router'


import { XButton,Icon,Sticky,Tab, TabItem,Swiper } from 'vux'

Vue.component('x-button', XButton)
Vue.component('icon', Icon)
Vue.component('sticky', Sticky)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('swiper', Swiper);

Vue.use(VueRouter);

FastClick.attach(document.body)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
