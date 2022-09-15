<template>
    <div class="f-tag-list" :style="{left: $store.state.asideWidth}">

        <el-tabs v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab" style="min-width:100px;">
            <el-tab-pane :closable="isClosable != '/'" v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path">
            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

//路由关联tab
const route = useRoute()
const activeTab = ref(route.path)

const tabList = ref([
    {
        title: '后台首页',
        path: '/'
    },
    {
        title: '商城管理',
        path: '/goods/list'
    },
])


const removeTab = (targetName) => {

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

.tag-btn{
    @apply bg-white rounded ml-auto flex justify-center items-center px-2;
    height: 32px;
}

:deep(.el-tabs__header){
    @apply mb-0;
}

:deep(.el-tabs__nav){
    border: 0!important;
}

:deep(.el-tabs__item){
    border: 0!important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
    line-height: 32px;
    height: 32px;
}

:deep(.is-disabled){
cursor: not-allowed;
@apply text-gray-300;
}
</style>