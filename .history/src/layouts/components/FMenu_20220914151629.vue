<template>
    <div class="f-menu">

        <el-menu default-active="2" class="border-0">

            <template v-for="(item,index) in asideMenus" :key="index">
                <el-sub-menu v-if="(item.child && item.child.length>0)" :index="item.name">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>Navigator One</span>
                    </template>
                    <el-menu-item-group title="Group One">
                        <el-menu-item index="1-1">item one</el-menu-item>
                        <el-menu-item index="1-2">item two</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group Two">
                        <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group>
                    <el-sub-menu index="1-4">
                        <template #title>item four</template>
                        <el-menu-item index="1-4-1">item one</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                    <el-icon>
                        <icon-menu />
                    </el-icon>
                    <span>Navigator Two</span>
                </el-menu-item>
            </template>

        </el-menu>

    </div>
</template>

<script setup>
const asideMenus = [
    {
        "name": "后台面板",
        "icon": "help",
        "child": [{
            "name": "主控台",
            "icon": "home-filled",
            "frontpath": "/"
        }]
    },
    {
        "name": "商品管理",
        "icon": "shopping-bag",
        "child": [{
            "name": "商品管理",
            "icon": "shopping-cart-full",
            "frontpath": "/goods/list"
        }]
    }
]
</script>

<style>
.f-menu {
    width: 250px;
    top: 64px;
    left: 0px;
    bottom: 0px;
    overflow: auto;
    @apply shadow-md fixed bg-light-50;
}
</style>