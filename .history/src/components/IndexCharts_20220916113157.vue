<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单管理</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" :checked="current == item.value"
                        @click="handleChoose(item.value)" style="margin-right: 8px">{{item.text}}</el-check-tag>
                </div>
            </div>
        </template>
        <div ref="el" id="chart" style="width:100%; height:300px;">
        </div>
    </el-card>

</template>
<script setup>
import { ref, onMounted,onBeforeUnmount } from 'vue';
import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts';
import {getStatistics3} from '~/api/index.js'

const current = ref("week")
const options = [
    {
        text: "近一个月",
        value: "month"
    },
    {
        text: "近一周",
        value: "week"
    },
    {
        text: "近24小时",
        value: "hour"
    },
]
// 选择事件
const handleChoose = (value) => {
    current.value = value
    //重新加载数据
    getData()
}

// 需要获取id元素，引入onMounted生命周期，渲染完后再获取
var myChart = null
onMounted(() => {
    var chartDom = document.getElementById('chart');
    if(chartDom){
        myChart = echarts.init(chartDom);
    }
    getData()
})

// 防止echarts未释放导致白屏
onBeforeUnmount(()=>{
    if(myChart) echarts.dispose(myChart)
})

function getData(){
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    //加载动画
    myChart.showLoading()
    getStatistics3(current.value).then(res=>{
        option.xAxis.data = res.x
        option.series[0].data = res.y
        myChart.setOption(option);
    }).finally(()=>{
        myChart.hideLoading()
    })
}

//图表等比自适应
const el = ref(null)
useResizeObserver(el, (entries) => {
      myChart.resize();
    })
</script>