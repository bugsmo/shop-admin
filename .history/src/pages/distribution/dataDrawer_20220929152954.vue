<template>
    <el-drawer title="推广人信息" v-model="dialogVisible" size="70%">
                <!-- 搜索 -->
        <el-form :model="searchForm">
            <el-form-item label="时间选择">
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="today">今天</el-radio-button>
                <el-radio-button label="yesterday">昨天</el-radio-button>
                <el-radio-button label="last7days">最近7天</el-radio-button>
            </el-form-item>

            <el-form-item label="开始时间">
                <el-date-picker v-model="searchForm.starttime" type="date" size="normal" placeholder="选择开始日期"
                    value-format="YYYY-MM-DD">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker v-model="searchForm.endtime" type="date" size="normal" placeholder="选择结束日期"
                    value-format="YYYY-MM-DD">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="searchForm.keyword" placeholder="关键词" clearable></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="getData">搜索</el-button>
                <el-button @click="resetSearchForm">重置</el-button>
            </el-form-item>
        </el-form>
        

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
            <el-table-column label="用户信息" width="200">
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
        
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="{ row }">
                    <el-button type="primary" size="small" text @click="openDataDrawer(row.user_info.id)">推广人</el-button>
                    <el-button type="primary" size="small" text>推广订单</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <div class="flex items-center justify-center mt-4">
            <el-pagination background layout="prev,pager, next" :total="totalCount" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-drawer>
    
</template>
<script setup>
    import { ref } from 'vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import { getAgentList } from '~/api/distribution.js';
import { useInitTable } from '~/composables/useCommon.js';

    const dialogVisible = ref(false)

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
        type: "all",
        starttime: "",
        endtime: ""
    },
    getList: getAgentList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        totalCount.value = res.totalCount
    }
})


    const open = (id)=>{
        dialogVisible.value = true
    }

    defineExpose({
        open
    })
</script>