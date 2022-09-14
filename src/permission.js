import { router, addRoutes } from '~/router'
import { getToken } from '~/composables/auth.js'
import { toast, showFullLoading, hideFullLoading } from '~/composables/utils.js'
import store from './store'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 显示全局loading
    showFullLoading()

    const token = getToken()

    // 没有登录，强制跳转到登录页面
    if (!token && to.path != '/login') {
        toast("请先登录", "error")
        return next({ path: "/login" })
    }

    // 防止重复登录
    if (token && to.path == "/login") {
        toast("请不要重复登录", "error")
        return next({ path: from.path ? from.path : "/" })
    }

    let hasNewRoutes = false
    // 如果用户登录了，自动获取用户信息，并存储在vuex当中
    if (token) {
        // 异步操作，需要await
        // store已经存储了menus，放在resolve(res)
        // res存储了菜单，解构菜单 {menus}直接获取到菜单
        let {menus} = await store.dispatch("getinfo")
        // console.log(menus);
        //动态添加路由
        hasNewRoutes = addRoutes(menus)
    }

    // 动态标题
    let title = (to.meta.title ? to.meta.title : "") + "莫维龙"
    document.title = title
    
    // 判断是否有新路由，有就走指定路由
    hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置钩子
router.afterEach((to, from) => {
    hideFullLoading()
})