import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Seller_BuyerVue from '@/views/Forms/Seller_Buyer.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FormContainer.vue')
  },
  {
    path:'/Sup-details/:uniqueid',
    name:'Seller_Buyer-Details',
    component:Seller_BuyerVue,
    props:true,
  },
  {
    path:'/Price',
    name:'Seller_Buyer-Price',
    component:import('../views/Forms/Val_dtls.vue'),
    props:true,
  },
  {
    path:'/Documents',
    name:'Seller_Buyer-Documents',
    component:import('../views/Forms/Doc.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
