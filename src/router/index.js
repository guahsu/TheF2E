import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/components/Index')
    },
    {
      path: '/1/todolist',
      name: 'TodoList',
      component: () => import('@/components/TodoList')
    },
    {
      path: '/2/filter',
      name: 'Filter',
      component: () => import('@/components/Filter')
    },
    {
      path: '/3/admin_order',
      name: 'AdminOrder',
      component: () => import('@/components/AdminOrder')
    },
    {
      path: '/4/product_gallery',
      name: 'ProductGallery',
      component: () => import('@/components/ProductGallery')
    },
    {
      path: '/5/comic_viewer',
      name: 'ComicViewer',
      component: () => import('@/components/ComicViewer')
    }
  ]
})
