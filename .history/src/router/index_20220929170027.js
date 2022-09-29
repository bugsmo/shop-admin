import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from '~/pages/404.vue'
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import GoodsList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'
import UserList from '~/pages/user/list.vue'
import OrderList from '~/pages/order/list.vue'
import CommentList from '~/pages/comment/list.vue'
import ImageList from '~/pages/image/list.vue'
import NoticeList from '~/pages/notice/list.vue'
import SettingBase from '~/pages/setting/base.vue'
import CouponList from '~/pages/coupon/list.vue'
import ManagerList from '~/pages/manager/list.vue'
import AccessList from '~/pages/access/list.vue'
import RoleList from '~/pages/role/list.vue'
import SkusList from '~/pages/skus/list.vue'
import LevelList from '~/pages/level/list.vue'
import SettingBuy from '~/pages/setting/buy.vue'
import SettingShip from '~/pages/setting/ship.vue'
import DistributionIndex from '~/pages/distribution/index.vue'

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
    },
    {
        path: '/user/list',
        name: '/user/list',
        component: UserList,
        meta: {
            title: "用户"
        }
    },
    {
        path: '/order/list',
        name: '/order/list',
        component: OrderList,
        meta: {
            title: "订单"
        }
    },
    {
        path: '/comment/list',
        name: '/comment/list',
        component: CommentList,
        meta: {
            title: "评价"
        }
    },
    {
        path: '/image/list',
        name: '/image/list',
        component: ImageList,
        meta: {
            title: "图库"
        }
    },
    {
        path: '/notice/list',
        name: '/notice/list',
        component: NoticeList,
        meta: {
            title: "公告"
        }
    },
    {
        path: '/setting/base',
        name: '/setting/base',
        component: SettingBase,
        meta: {
            title: "配置"
        }
    },
    {
        path: '/coupon/list',
        name: '/coupon/list',
        component: CouponList,
        meta: {
            title: "优惠券"
        }
    },
    {
        path: '/manager/list',
        name: '/manager/list',
        component: ManagerList,
        meta: {
            title: "管理员管理"
        }
    }, 
    {
        path: '/access/list',
        name: '/access/list',
        component: AccessList,
        meta: {
            title: " 权限管理"
        }
    }, 
    {
        path: '/role/list',
        name: '/role/list',
        component: RoleList,
        meta: {
            title: " 角色管理"
        }
    },
    {
        path: '/skus/list',
        name: '/skus/list',
        component: SkusList,
        meta: {
            title: " 规格管理"
        }
    },
    {
        path: '/level/list',
        name: '/level/list',
        component: LevelList,
        meta: {
            title: " 会员管理"
        }
    },
    {
        path: '/setting/buy',
        name: '/setting/buy',
        component: SettingBuy,
        meta: {
            title: " 支付管理"
        }
    },
    {
        path: '/setting/ship',
        name: '/setting/ship',
        component: SettingShip,
        meta: {
            title: " 物流设置"
        }
    },
    {
        path: '/distribution/index',
        name: '/distribution/index',
        component: DistributionIndex,
        meta: {
            title: " 分销管理"
        }
    },
    {
        path: '/distribution/setting',
        name: '/distribution/setting',
        component: DistributionSetting,
        meta: {
            title: " 分销管理"
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