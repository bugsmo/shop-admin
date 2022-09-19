<template>
    <el-container class="bg-white rounded">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script setup>
    // 容器占满主体空间
    // 浏览器可视部分的高度 或 
    window.innerHeight || document.body.clientHeight
</script>