<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" v-for="i in 4" :key="i">
                <el-skeleton style="width: 100%">
                    <template #template>
                        <el-skeleton-item variant="text" style="width: 30%" />
                    </template>
                </el-skeleton>
            </el-col>

            <!-- 6*4=24分栏 4个框 -->
            <el-col :span="6" :offset="0" v-for="(item,index) in panels" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                        <div class="flex justify-between">
                            <span class="text-sm">{{ item.title }}</span>
                            <el-tag :type="item.unitColor" effect="light">
                                {{ item.unit }}
                            </el-tag>
                        </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        {{ item.value }}
                    </span>
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{item.subTitle}}</span>
                        <span>{{item.subValue}}</span>
                    </div>
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