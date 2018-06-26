import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import TodoList from '@/components/TodoList'
import Filter from '@/components/Filter'
import AdminOrder from '@/components/AdminOrder'
import ProductGallery from '@/components/ProductGallery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/1/todolist',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/2/filter',
      name: 'Filter',
      component: Filter
    },
    {
      path: '/3/admin_order',
      name: 'AdminOrder',
      component: AdminOrder
    },
    {
      path: '/4/product_gallery',
      name: 'ProductGallery',
      component: ProductGallery
    }
  ]
})
