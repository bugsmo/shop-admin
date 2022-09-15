<template>
    <el-container>
        <el-header>
            <f-header></f-header>
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <f-menu></f-menu>
            </el-aside>
            <el-main>
                <f-tag-list></f-tag-list>
                <!-- 解构获取点击的组件 -->
                <router-view v-slot="{ Component }">
                    <!-- 全局动画效果 -->
                    <transition name="fade">
                        <!-- 缓存组件，最大10个 -->
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';
</script>

<style>
.el-aside {
    transition: all 0.2s;
}

.fade-enter-from {
    opacity: 0;
}
.fade-enter-to {
    opacity: 1;
}

.fade-leave-from {
    opacity: 1;
}
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active, .fade-leave-active{
    transition: all 0.3s;
}
</style>