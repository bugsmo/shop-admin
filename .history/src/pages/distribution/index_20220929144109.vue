<template>

    <panel />

    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->
        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
            <SearchItem label="关键词">
                <el-input v-model="searchForm.keyword" placeholder="手机号/邮箱/会员昵称" clearable></el-input>
            </SearchItem>
            <template #show>
                <SearchItem label="会员等级">
                    <el-select v-model="searchForm.user_level_id" placeholder="请选择会员等级" clearable>
                        <el-option v-for="item in user_level" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
    
                </SearchItem>
            </template>
        </Search>
    
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column label="会员" width="200">
                <template #default="scope">
                    <div class="flex items-center">
                        <el-avatar :size="40" :src="scope.row.avatar">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                        <div class="ml-3">
                            <h6>{{scope.row.username}}</h6>
                            <small>ID:{{scope.row.id}}</small>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="会员等级" align="center">
                <template #default="{ row }">
                    {{ row.user_level?.name || "-" }}
                </template>
            </el-table-column>
            <el-table-column label="登录注册" align="center">
                <template #default="{ row }">
                    <p v-if="row.last_login_time">最后登录时间：{{row.last_login_time }}</p>
                    <p>注册时间： {{ row.create_time }}</p>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :loading="row.statusLoading" :active-value="1" :inactive-value="0"
                        :disabled="row.super == 1" @change="handleStatusChange($event,row)">
                    </el-switch>
    
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text>推广人</el-button>
                    <el-button type="primary" size="small" text>推广订单</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <div class="flex items-center justify-center mt-4">
            <el-pagination background layout="prev,pager, next" :total="totalCount" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

    </el-card>

</template>
<script setup>
    import panel from './panel.vue';
import { ref } from 'vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import { getAgentList } from '~/api/distribution.js';
import { useInitTable } from '~/composables/useCommon.js';


const {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    totalCount,
    limit,
    getData,
    handleDelete,
    handleStatusChange
} = useInitTable({
    searchForm: {
        keyword: "",
        user_level_id: null
    },
    getList: getAgentList,
    onGetListSuccess: (res) => {
        tableData.value = res.list.map((o) => {
            //修改状态时开启loading
            o.statusLoading = false
            return o
        })
        totalCount.value = res.totalCount
        user_level.value = res.user_level
    },
    delete: deleteUser,
    updateStatus: updateUserStatus
})
</script>