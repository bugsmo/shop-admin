<template>
    <el-card shadow="never">
        <template #header>
        <div class="flex justify-between">
            <span class="text-sm">{{ title }}</span>
            <el-tag type="danger" effect="light">
                {{ tips }}
            </el-tag>
        </div>
        </template>
        <el-row :gutter="20">
            <el-col :span="6" :offset="0">
            <el-card shadow="hover">
                <div class="flex flex-col justify-center items-center">
                    <span>1</span>
                    <span>代付款</span>
                </div>
            </el-card>
            </el-col>
        </el-row>
        
    </el-card>
    
</template>

<script setup>
    defineProps({
        title:String,
        tips:String
    })
</script>