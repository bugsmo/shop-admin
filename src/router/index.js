import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from '~/pages/404.vue'
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import GoodsList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'

// 默认路由，所有用户共享
const routes = [
    {
        path: '/',
        //name 添加动态路由需要使用到
        name: 'admin',
        component: Admin,
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: "登录页面"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

// 动态路由，根据菜单匹配路由
const asyncRoutes = [
    {
        path: '/',
        //name 判断路由是否存在需要使用到
        name: '/',
        component: Index,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: GoodsList,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: '/category/list',
        name: '/category/list',
        component: CategoryList,
        meta: {
            title: "分类管理"
        }
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
    //是否有新的路由
    let hasNewRoutes = false

    const findAndAddRoutesByMenus = (arr) => {
        //遍历菜单数组
        arr.forEach(e => {
            //根据菜单匹配路由
            let item = asyncRoutes.find(o => o.path == e.frontpath)
            //判断路由是否存在
            if (item && !router.hasRoute(item.path)) {
                //添加子路由
                router.addRoute('admin',item)
                hasNewRoutes = true
            }
            //判断子路由是否存在
            if (e.child && e.child.length > 0) {
                // 递归添加路由
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoutes
}