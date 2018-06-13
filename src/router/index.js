import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoList from '@/components/TodoList'
import Filter from '@/components/Filter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
