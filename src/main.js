// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
/*import Home from './components/HelloFromVux'*/
import router from './router'
import axios from "axios"

import { Confirm,ConfirmPlugin ,Alert,Loading,XDialog,Swipeout, SwipeoutItem, SwipeoutButton ,XHeader ,XNumber ,PopupPicker,Popup,Checker, CheckerItem,Cell,CellBox ,Panel,Flexbox, FlexboxItem,XButton,Icon,Sticky,Tab, TabItem,Swiper,SwiperItem,Group,XInput,XAddress,XTextarea,Radio,XSwitch } from 'vux'

Vue.component('x-button', XButton)
Vue.component('icon', Icon)
Vue.component('sticky', Sticky)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('swiper', Swiper);
Vue.component('swiper', Swiper);
Vue.component("swiper-item",SwiperItem)
Vue.component("group",Group);
Vue.component('x-input', XInput)
Vue.component('x-address', XAddress)
Vue.component('x-textarea', XTextarea)
Vue.component('radio', Radio)
Vue.component('x-switch', XSwitch)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('panel', Panel)
Vue.component('cell-box', CellBox)
Vue.component('cell', Cell)
Vue.component('cell', Cell)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('popup', Popup)
Vue.component('popup-picker', PopupPicker)
Vue.component('x-number', XNumber)
Vue.component('x-header', XHeader)
Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)
Vue.component('swipeout-button', SwipeoutButton)
Vue.component('x-dialog', XDialog)
Vue.component('loading', Loading)
Vue.component('alert', Alert)
Vue.component('confirm', Confirm)
Vue.use(ConfirmPlugin)



if(process.env.NODE_ENV=="development"){
  axios.defaults.baseURL="/api/";
}

Vue.prototype.axios=axios;

Vue.use(VueRouter);

FastClick.attach(document.body)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
