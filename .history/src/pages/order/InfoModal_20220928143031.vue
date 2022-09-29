<template>
    <el-drawer title="订单详情" v-model="dialogVisible" size="40%">
        <el-card shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">订单信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="订单号">
                    {{ info.no }}
                </el-form-item>
                <el-form-item label="付款方式">
                    {{ info.payment_method }}
                </el-form-item>
                <el-form-item label="付款时间">
                    {{ info.paid_time }}
                </el-form-item>
                <el-form-item label="创建时间">
                    {{ info.create_time }}
                </el-form-item>
            </el-form>
        </el-card>

        <el-card shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">商品信息</b>
            </template>
            <div class="flex mb-2" v-for="(item, index) in info.order_items" :key="index">
                <el-image :src="item.goods_item?.cover ?? ''" fit="cover" :lazy="true" style="width:50px;height:50px;"></el-image>
                <div class="ml-2 text-sm">
                    <p>{{item.goods_item?.title ?? '商品已被删除'}}</p>
                    <p v-if="item.sku_type == 1 && item.goods_skus" class="mt-1">
                    <el-tag type="info" size="small">
                        {{item.goods_skus.skus.map(o=>o.value)}}
                    </el-tag>
                    
                    </p>
                </div>
            </div>
        </el-card>

        <el-card shadow="never" v-if="info.address" class="mb-3">
            <template #header>
                <b class="text-sm">收货信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="收货人">
                    {{ info.address.name }}
                </el-form-item>
                <el-form-item label="联系方式">
                    {{ info.address.phone }}
                </el-form-item>
                <el-form-item label="收货地址">
                    {{ info.address.province + info.address.city + info.address.district + info.address.address }}
                </el-form-item>
            </el-form>
        </el-card>
    </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue';

const dialogVisible = ref(false)

const open = () => dialogVisible.value = true
const close = () => dialogVisible.value = false

defineProps({
    info: Object
})

defineExpose({
    open
})
</script>