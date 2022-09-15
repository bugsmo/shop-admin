import { createRouter,createWebHashHistory } from "vue-router";
import NotFound from '~/pages/404.vue'
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import GoodsList from '~/pages/goods/list.vue'

const routes = [
    {
        path:'/',
        component:Admin,
        children:[{
            path: '/',
            component: Index,
            meta: {
                title: "后台首页"
            }
        }]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: "登录页面"
        }
    },
    {
        path: '/goods/list',
        component: GoodsList,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: NotFound
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router