<template>
    <el-container class="bg-white rounded" :style="{height: (h + 'px')}">
        <el-header class="image-header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="image-aside">
                <div class="top" v-for="i in 100" :key="i">
                    {{i}}
                </div>
                <div class="bottom">
                    分页区域
                </div>
            </el-aside>
            <el-main class="image-main">
                <div class="top" v-for="i in 100" :key="i">
                    {{i}}
                </div>
                <div class="bottom">
                    分页区域
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
// 容器占满主体空间
// 浏览器可视部分的高度 或 
const windowHeight = window.innerHeight || document.body.clientHeight
// 减去header等的高度 padding 40
const h = windowHeight - 64 - 44 - 40
</script>

<style>
.image-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}
.image-aside{
    border-right: 1px solid #eeeeee;
    position: relative;
}
.image-aside .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}
.image-aside .bottom{
    position: absolute;
    @apply flex justify-center items-center;
}
</style>