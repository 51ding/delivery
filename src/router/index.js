import Vue from 'vue'
import Router from 'vue-router'
import HelloFromVux from '@/components/HelloFromVux'
import Address from '@/components/Address'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloFromVux',
      component: HelloFromVux
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
  ]
})
