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
    </el-card>

</template>

<script setup>
import { ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import { getRoleList, createRole, updateRole, deleteRole, updateRoleStatus, setRoleRules } from '~/api/role.js';
import { getRuleList } from '~/api/rule.js';
import { useInitTable, useInitForm } from '~/composables/useCommon.js';
import { toast } from '~/composables/utils';

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
//权限列表
const ruleList = ref([])
//当前角色id
const roleId = ref(0)
//默认展开的节点
const defaultExpandedKeys = ref([])
//tree高度
const treeHeight = ref(0)
// 当前角色拥有的权限列表
const ruleIds = ref([])
const elTreeRef = ref(null)
// 父子不互相关联，默认false
const checkStrictly = ref(false)

const handleSetRule = (row) => {
    roleId.value = row.id
    treeHeight.value = window.innerHeight - 180
    //获取角色的权限数据前，配置父子相关联，即点击父级会包含所有子级
    checkStrictly.value = true

    getRuleList(1)
        .then(res => {
            ruleList.value = res.list
            //默认展开一级节点的id列表
            defaultExpandedKeys.value = res.list.map(o => o.id)
            //打开表单
            setRuleFormDrawerRef.value.open()

            //当前角色拥有的权限id
            ruleIds.value = row.rules.map(o => o.id)
            setTimeout(() => {
                checkStrictly.value = false
                //通过 keys 设置目前角色应该勾选的节点
                elTreeRef.value.setCheckedKeys(ruleIds.value)
            }, 150)
        })
}
const setRuleHandleSubmit = () => {
    setRuleFormDrawerRef.value.showLoading()
    //传入当前角色id，权限id
    setRoleRules(roleId.value, ruleIds.value)
        .then(res => {
            toast("配置权限成功")
            getData()
            setRuleFormDrawerRef.value.close()
        })
        .finally(() => {
            setRuleFormDrawerRef.value.hideLoading()
        })
}

//当复选框被点击的时候触发，获取用户配置的权限id
const handleTreeCheck = (...e) => {
    const { checkedKeys
        , halfCheckedKeys } = e[1]
    ruleIds.value = [...checkedKeys, ...halfCheckedKeys]
}
</script>