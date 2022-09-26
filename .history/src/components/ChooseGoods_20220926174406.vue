<template>
    <el-dialog
        title="商品选择"
        v-model="dialogVisible"
        width="30%"
        :before-close="">
        <span></span>
        <template #footer>
        <span>
            <el-button @click=" = false">Cancel</el-button>
            <el-button type="primary" @click="">OK</el-button>
        </span>
        </template>
    </el-dialog>
    
</template>
<script setup>
    import {ref} from 'vue';

const dialogVisible = ref(null)
</script>