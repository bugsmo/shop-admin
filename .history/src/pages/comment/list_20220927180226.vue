<template>
    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->
        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
            <SearchItem label="商品名称">
                <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
            </SearchItem>

        </Search>

        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData" />

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column label="ID" width="70" align="center" prop="id"></el-table-column>
            <el-table-column label="商品" width="200">
                <template #default="{row}">
                    <div class="flex items-center">
                        <el-image :src="row.goods_item ? row.goods_item.cover : ''" fit="cover" :lazy="true" style="width:50px;height:50px;" class="rounded"></el-image>
                        
                        <div class="ml-3">
                            <h6>{{row.goods_item?.title ?? '商品已被删除'}}</h6>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评价信息" width="200">
                <template #default="{ row }">
                    <div>
                        <p>用户：{{ row.user.nickname || row.user.username }}</p>
                        <p>
                            <el-rate v-model="row.rating" disabled show-score text-color="#ff9900" />
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评价时间" width="180" prop="review_time" align="center"/>
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :loading="row.statusLoading" :active-value="1"
                        :inactive-value="0" :disabled="row.super == 1" @change="handleStatusChange($event,row)">
                    </el-switch>

                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <small v-if="scope.row.super == 1" class="text-gray-500 text-sm">暂无操作</small>
                    <div v-else>
                        <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                        <el-popconfirm title="是否要删除该管理员?" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row.id)">
                            <template #reference>
                                <el-button text type="primary" size="small">删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </div>
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
import { ref } from 'vue';
import ListHeader from '~/components/ListHeader.vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import { getGoodsCommentList, updateGoodsCommentStatus } from '~/api/goods_comment.js';
import { useInitTable } from '~/composables/useCommon.js';

const roles = ref([])
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
        keyword: ""
    },
    getList: getGoodsCommentList,
    onGetListSuccess: (res) => {
        roles.value = res.roles
        tableData.value = res.list.map((o) => {
            //修改状态时开启loading
            o.statusLoading = false
            return o
        })
        totalCount.value = res.totalCount
    },
    updateStatus: updateGoodsCommentStatus
})
</script>