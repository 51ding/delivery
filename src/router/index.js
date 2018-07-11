import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Address from '@/components/Address'
import Test from '@/components/Test'
import Message from '@/components/Message'
import OrderDetail from '@/components/PaySuccess'
import Verify from '@/components/Verify'
import ExpressDelivery from '@/components/ExpressDelivery'
import Order from '@/components/Order'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Address/:id',
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
    },
    {
      path:"/order/:no",
      name:"Order",
      component:OrderDetail
    },
    {
      path:"/verify",
      name:"Verify",
      component:Verify
    },
    {
      path:"/express",
      name:"ExpressDelivery",
      component:ExpressDelivery
    }
  ]
})
