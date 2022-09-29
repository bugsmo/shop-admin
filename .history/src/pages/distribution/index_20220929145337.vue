<template>

    <panel />

    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->
        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
            <SearchItem label="关键词">
                <el-input v-model="searchForm.keyword" placeholder="手机号/邮箱/会员昵称" clearable></el-input>
            </SearchItem>
            <template #show>
                <!-- <SearchItem label="会员等级">
                    <el-select v-model="searchForm.user_level_id" placeholder="请选择会员等级" clearable>
                        <el-option v-for="item in user_level" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
    
                </SearchItem> -->
            </template>
        </Search>
    
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column label="ID" prop="id" align="center"></el-table-column>
            <el-table-column label="头像" width="65">
                <template #default="scope">
                    <div class="flex items-center">
                        <el-avatar :size="40" :src="scope.row.avatar">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="用户信息">
                <template #default="{ row }">
                    <div class="text-xs">
                        <p>用户：{{ row.username }}</p>
                        <p>昵称：{{ row.nickname }}</p>
                        <p>姓名：{{ row.user_info.name }}</p>
                        <p>电话：{{ row.phone }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="推广用户数量" prop="share_num" align="center" />
            <el-table-column label="订单数量" prop="share_order_num" align="center" />
            <el-table-column label="订单金额" prop="order_price" align="center" />
            <el-table-column label="账户佣金" prop="commission" align="center" />
            <el-table-column label="已提现金额" prop="cash_out_price" align="center" />
            <el-table-column label="提现次数" prop="cash_out_time" align="center" />
            <el-table-column label="未提现金额" prop="no_cash_out_price" align="center" />
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
    getData
} = useInitTable({
    searchForm: {
        keyword: "",
        user_level_id: null
    },
    getList: getAgentList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        totalCount.value = res.totalCount
    }
})
</script>