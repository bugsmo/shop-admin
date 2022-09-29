<template>
    <el-drawer title="订单详情" v-model="dialogVisible" size="40%">
       {{info}}
    
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