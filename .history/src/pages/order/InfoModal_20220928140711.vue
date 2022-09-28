<template>
    <el-drawer title="订单详情" v-model="dialogVisible" size="40%">
        <el-card shadow="never">
            <template #header>
            <b class="text-sm">订单信息</b>
            </template>
            <!-- card body -->
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