import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';
import { router } from '../../router';

export function useTabList() {
    //路由关联tab
    const route = useRoute()
    const activeTab = ref(route.path)

    // cookie 存储新增的tab页
    const cookie = useCookies()

    const tabList = ref([
        {
            title: '后台首页',
            path: '/'
        },
    ])

    // 添加tab页 
    function addTab(tab) {
        // 通过查找tab列表的回调t，判断是否有路由相同的tab
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        // cookie 存储新增的tab页
        cookie.set("tabList", tabList.value)
    }

    // 初始化标签导航
    function initTabList() {
        let tbs = cookie.get("tabList")
        if (tbs) {
            tabList.value = tbs
        }
    }

    initTabList()

    //监听路由，实现新建tab页
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })

    //监听tab点击事件，切换到对应路由
    const changeTab = (t) => {
        router.push(t)
    }

    const removeTab = (t) => {
        // 当前tab数组
        let tabs = tabList.value
        //当前点击的标签页
        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    //如果没有下一个标签，就获取上一个标签
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }
        //标签焦点跳到下一个
        activeTab.value = a
        //删除关闭的标签页
        tabList.value = tabList.value.filter(tab => tab.path != t)
        cookie.set("tabList", tabList.value)
    }

    const handleClose = (c) => {
        if (c == "clearAll") {
            //切换回首页标签
            activeTab.value = "/"
            //过滤只剩首页标签
            tabList.value = [{
                title: '后台首页',
                path: '/'
            }]
        } else if (c == "clearOther") {
            //过滤只剩首页和标签
            tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path == activeTab.value)
        }

        // 更新cookie
        cookie.set("tabList", tabList.value)
    }
}