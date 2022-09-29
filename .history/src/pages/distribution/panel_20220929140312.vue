<template>
    <el-row :gutter="20" class="mb-5">
        <el-col :span="6" :offset="0" v-for="(item, index) in list" :key="index">
            <el-card shadow="never">
                <div class="flex items-center">
                    <el-icon><User /></el-icon>
                </div>
            </el-card>
            
        </el-col>
    </el-row>
    
</template>
<script setup>
import { ref } from 'vue';
import { getAgentStatistics } from '~/api/distribution'

const list = ref([])
const loading = ref(false)
loading.value = true

getAgentStatistics()
.then(res=>{
    list.value = res
    console.log(res);
})
.finally(()=>{
    loading.value = false
})
</script>