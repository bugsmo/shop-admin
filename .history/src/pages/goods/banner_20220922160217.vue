<template>
    <el-drawer title="设置轮播图" v-model="dialigVisible" size="50%" destroy-on-close>
        <el-form :model="form" label-width="80px">
            <el-form-item label="">
                <el-input v-model="form."></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        
    </el-drawer>

</template>
<script setup>
import  { ref,reactive } from 'vue'

const dialigVisible = ref(false)
const form = reactive({
    banners:[]
})
</script>