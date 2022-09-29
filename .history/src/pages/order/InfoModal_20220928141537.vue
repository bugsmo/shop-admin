<template>
    <el-drawer title="订单详情" v-model="dialogVisible" size="40%">
        <el-card shadow="never">
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

        <el-card shadow="never">
            <template #header>
                <b class="text-sm">商品信息</b>
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

        <el-card shadow="never" v-if="info.address">
            <template #header>
                <b class="text-sm">收货信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="收货人">
                    {{ info.no }}
                </el-form-item>
                <el-form-item label="联系方式">
                    {{ info.payment_method }}
                </el-form-item>
                <el-form-item label="收货地址">
                    {{ info.paid_time }}
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