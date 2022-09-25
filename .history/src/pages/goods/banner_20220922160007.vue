<template>
    <el-drawer title="设置轮播图" v-model="dialigVisible" size="50%" destroy-on-close>
    </el-drawer>

</template>
<script setup>
import  { ref } from 'vue'
const dialigVisible = ref(false)
</script>