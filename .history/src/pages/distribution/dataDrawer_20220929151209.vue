<template>
    <el-drawer title="推广人信息" v-model="dialogVisible" size="70%">
    </el-drawer>
    
</template>
<script setup>
    import { ref } from 'vue';

    const dialogVisible = ref(false)

    const open = (id)=>{
        dialogVisible.value = true
    }

    defineExpose({
        open
    })
</script>