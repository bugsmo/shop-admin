<template>
    <el-drawer title="物流信息" v-model="dialogVisible" size="40%">
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue';

const dialogVisible = ref(false)

const open = () => dialogVisible.value = true
const close = () => dialogVisible.value = false


defineExpose({
    open
})
</script>