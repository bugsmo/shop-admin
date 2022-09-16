<template>
    <el-container class="bg-white rounded" :style="{height: (h + 'px')}">
        <el-header class="image-header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="image-aside">
                <div class="top" v-for="i in 100" :key="i">
                    {{i}}
                </div>
                <div class="buttom">
                    分页区域
                </div>
            </el-aside>
            <el-main class="image-main">Main</el-main>
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