<template>
    <el-card shadow="never">
        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-tree :data="tableData" :props="defaultProps" v-loading="loading" node-key="id" @node-click="handleNodeClick" />
    </el-card>
    
</template>
<script setup>
import ListHeader from '~/components/ListHeader.vue';
import { getRuleList } from '~/api/rule.js'
import { useInitTable } from '~/composables/useCommon.js';

const { 
    loading,
    tableData,
    getData
 } = useInitTable({ getList: getRuleList})

const defaultProps={
    label:"name",
    children:"child"
}
</script>