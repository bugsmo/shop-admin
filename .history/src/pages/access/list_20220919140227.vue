<template>
    <el-card shadow="never">
        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData" />
        <div>
            quanxianguanli
        </div>
    </el-card>
    
</template>
<script setup>
import ListHeader from '~/components/ListHeader.vue';

</script>