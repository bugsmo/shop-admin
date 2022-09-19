<template>
    <div>
        <el-row :gutter="20">
            <!-- 6*4=24 4个框 -->
            <el-col :span="6" :offset="0"></el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getStatistics1 } from '~/api/index.js';

const panels = ref([])
getStatistics1()
    .then(res=> {
        panels.value = res.panels
        console.log(panels.value);
    })
</script>