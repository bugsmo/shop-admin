import router from '~/router'
import { getToken } from '~/composables/auth.js'
import { toast,showFullLoading,hideFullLoading } from '~/composables/utils.js'
import store from './store'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    const token = getToken()

    // 没有登录，强制跳转到登录页面
    if(!token && to.path != '/login'){
        toast("请先登录","error")
        return next({path:"/login"})
    }

    // 防止重复登录
    if(token && to.path == "/login"){
        toast("请不要重复登录","error")
        return next({path: from.path ? from.path : "/"})
    }

    // 如果用户登录了，自动获取用户信息，并存储在vuex当中
    if(token){
        // 异步操作，需要await
       await store.dispatch("getinfo")
    }

    next()
})