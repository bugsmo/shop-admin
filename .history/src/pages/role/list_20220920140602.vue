<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData" />

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="desc" label="角色描述" width="380" />
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :loading="row.statusLoading" :active-value="1"
                        :inactive-value="0" :disabled="row.super == 1" @change="handleStatusChange($event,row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleSetRule(scope.row)">配置权限</el-button>
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                    <el-popconfirm title="是否要删除该角色?" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex items-center justify-center mt-4">
            <el-pagination background layout="prev,pager, next" :total="totalCount" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="desc">
                    <el-input v-model="form.desc" placeholder="角色描述" type="textarea" :rows="5"></el-input>
                </el-form-item>
                <el-form-item label="角色状态" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
        </FormDrawer>

        <!-- 配置权限按钮 -->
        <FormDrawer ref="setRuleFormDrawerRef" title="权限配置" @submit="setRuleHandleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-tree-v2 :data="ruleList" :props="{label: 'name',children: 'child',}" show-checkbox :height="treeHeight">
                <template #default="{ node }">
                    <span class="prefix" :class="{ 'is-leaf': node.isLeaf }">[ElementPlus]</span>
                    <span>{{ node.label }}</span>
                </template>
                </el-tree-v2>
            </el-form>
        </FormDrawer>
    </el-card>

</template>

<script setup>
import { ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import { getRoleList, createRole, updateRole, deleteRole, updateRoleStatus } from '~/api/role.js';
import { getRuleList } from '~/api/rule.js';
import { useInitTable, useInitForm } from '~/composables/useCommon.js';

const {
    tableData,
    loading,
    currentPage,
    totalCount,
    limit,
    getData,
    handleDelete,
    handleStatusChange
} = useInitTable({
    getList: getRoleList,
    delete: deleteRole,
    updateStatus: updateRoleStatus
})

const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handleCreate,
    handleEdit
} = useInitForm({
    getData,
    update: updateRole,
    create: createRole,
    form: {
        name: "",
        desc: "",
        status: 1
    },
    rules: {
        name: [
            { required: true, message: '角色名称必填', trigger: 'blur' }
        ]
    }
})

const setRuleFormDrawerRef = ref(null)
const ruleList = ref([])
const rowId = ref(0)
const treeHeight = ref(0)

const handleSetRule = (row) => {
    rowId.value = row.id
    treeHeight.value = window.innerHeight - 170
    getRuleList(1)
        .then(res => {
            ruleList.value = res.list
            setRuleFormDrawerRef.value.open()
        })
}
const setRuleHandleSubmit = () => {

}
</script>