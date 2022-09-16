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
        <!-- card body -->
    </el-card>
    
</template>

<script setup>
    defineProps({
        title:String,
        tips:String
    })
</script>