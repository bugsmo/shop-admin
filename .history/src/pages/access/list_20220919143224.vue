<template>
    <el-card shadow="never">
        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-tree :data="tableData" :props="defaultProps" v-loading="loading" node-key="id" default-expanded-keys="defaultExpandedKeys" @node-click="handleNodeClick" />
    </el-card>
    
</template>
<script setup>
    import {ref} from 'vue'
import ListHeader from '~/components/ListHeader.vue';
import { getRuleList } from '~/api/rule.js'
import { useInitTable } from '~/composables/useCommon.js';

const { 
    loading,
    tableData,
    getData
 } = useInitTable({ 
     getList: getRuleList,
     onGetListSuccess:(res)=>{
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o=>o.id)
     }
    })


const defaultExpandedKeys=ref([])

const defaultProps={
    label:"name",
    children:"child"
}
</script>