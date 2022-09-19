<template>
    <el-card shadow="never">
        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-tree :data="tableData" :props="defaultProps" v-loading="loading" node-key="id"
            :default-expanded-keys="defaultExpandedKeys" @node-click="handleNodeClick">
            <template #default="{ node, data }">
            <div class="">
                <el-tag size="small" :type="data.menu ? '':'info'">{{ data.menu ==1 ? '菜单':'权限' }}</el-tag>
                <el-icon v-if="data.icon" size="16" class="ml-2">
                    <component :is='data.icon'></component>
                </el-icon>
                <span>{{data.name}}</span>
                <div class="ml-auto">
                    <el-switch modelValue="status" :active-value="1" :inactive-value="0">
                    </el-switch>
                    <el-button text type="primary" size="small">修改</el-button>
                    <el-button text type="primary" size="small">增加</el-button>
                    <el-button text type="primary" size="small">删除</el-button>
                    
                    
                </div>
            </div>
            </template>
        </el-tree>

    </el-card>

</template>
<script setup>
import { ref } from 'vue'
import ListHeader from '~/components/ListHeader.vue';
import { getRuleList } from '~/api/rule.js'
import { useInitTable } from '~/composables/useCommon.js';

const defaultExpandedKeys = ref([])
const {
    loading,
    tableData,
    getData
} = useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)
    }
})




const defaultProps = {
    label: "name",
    children: "child"
}
</script>