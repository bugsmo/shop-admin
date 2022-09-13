<template>
    <el-container>
        <el-header>头部</el-header>
        <el-container>
            <el-aside>侧边</el-aside>
            <el-main>
                标签导航
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
    import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';
</script>