import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Address from '@/components/Address'
import Test from '@/components/Test'
import Message from '@/components/Message'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    }
  ]
})
