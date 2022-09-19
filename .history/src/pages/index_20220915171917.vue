<template>
    <div>
        <el-row :gutter="20">
            <!-- 6*4=24分栏 4个框 -->
            <el-col :span="6" :offset="0" v-for="(item,index) in panels" :key="index">
                <el-card shadow="hover">
                    <template #header>
                        <span>{{ item.title }}</span>
                        <el-tag :type="item.unitcolor" effect="light">
                            {{ item.unit }}
                        </el-tag>
                    </template>
                    <span>
                        {{ item.value }}
                    </span>
                    <el-divider />
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getStatistics1 } from '~/api/index.js';

const panels = ref([])
getStatistics1()
    .then(res => {
        panels.value = res.panels
        console.log(panels.value);
    })
</script>