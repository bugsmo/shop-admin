<template>
    <div class="f-tag-list" :style="{left: $store.state.asideWidth}">
        <el-tabs v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab" style="min-width:100px;" @tab-change="changeTab">
            <!-- closable 根路由关联的标签不可关闭 -->
            <el-tab-pane :closable="item.path != '/'" v-for="item in tabList" :key="item.path" :label="item.title"
                :name="item.path">
            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>

    <div style="height:44px;"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';
import { router } from '../../router';

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
function initTabList(){
    let tbs = cookie.get("tabList")
    if(tbs){
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
const changeTab = (t)=>{
    router.push(t)
}

const removeTab = (t) => {
    // 当前tab数组
    let tabs = tabList.value
    //当前点击的标签页
    let a = activeTab.value
    if(a == t){
        tabs.forEach((tab,index)=>{
            if(tab.path==t){
                //如果没有下一个标签，就获取上一个标签
                const nextTab = tabs[index+1]|| tabs[index-1]
                if(nextTab){
                    a = nextTab.path
                }
            }
        })
    }
    //标签焦点跳到下一个
    activeTab.value = a
    //删除关闭的标签页
    tabList.value = tabList.value.filter(tab=>tab.path !=t)
    cookie.set("tabList", tabList.value)
}
</script>

<style scoped>
.f-tag-list {
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0px;
    height: 44px;
    z-index: 100px;
}

.tag-btn {
    @apply bg-white rounded ml-auto flex justify-center items-center px-2;
    height: 32px;
}

:deep(.el-tabs__header) {
    border: 0 !important;
    @apply mb-0;
}

:deep(.el-tabs__nav) {
    border: 0 !important;
}

:deep(.el-tabs__item) {
    border: 0 !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height: 32px;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>