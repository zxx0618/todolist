const routes = [{
    path: '/',
    name: 'index',
    title: '首页',
    redirect:'/todolist'
},{
    path: '/todolist',
    name: 'todolist',
    title: 'todolist',
    component:  () => import('@/components/todo.vue')
}]
export default routes
