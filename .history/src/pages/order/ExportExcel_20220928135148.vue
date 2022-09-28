<template>
    <el-drawer title="导出订单" v-model="dialogVisible" size="40%">
        <el-form :model="form" label-width="80px">
            <el-form-item label="订单类型">
                <el-select v-model="form.tab" placeholder="请选择订单类型">
                    <el-option v-for="item in tabbars"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key">
                    </el-option>
                </el-select>
                
            </el-form-item>
            <el-form-item label="时间范围">
               <el-date-picker v-model="form.time" type="daterange" value-format="YYYY-MM-DD"
                   range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
               </el-date-picker>
               
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="loading">导出</el-button>
            </el-form-item>
        </el-form>
        
    </el-drawer>
    
</template>
<script setup>
    import {ref,reactive} from 'vue';
import { exportOrder} from '~/api/order'
import { toast } from '~/composables/utils';

const dialogVisible = ref(false)

const open = ()=> dialogVisible.value = true
const close = ()=> dialogVisible.value = false

const form = reactive({
    tab:null,
    time:""
})

const loading = ref(false)

const onSubmit = ()=>{
    if(!form.tab) return toast("订单类型不能为空","error")
    loading.value = true
    let starttime = null
    let endtime = null
    if(form.time && Array.isArray(from.time)){
        starttime = form.time[0]
        endtime = form.time[1]
    }

    exportOrder({
        tab:form.tab,
        starttime,
        endtime
    })
    .then(res=>{
        let url = window.URL.createObjectURL(new Blob([ res ]))
        //创建a标签
        let link = document.createElement("a")
        //关闭a标签的链接属性
        link.style.display = "none"
        //指定a标签的url
        link.href = url
        //文件名称
        let filename = (new Date()).getTime() + ".xlsx"
        //设置a标签属性
        link.attributes("download",filename)
        //将a标签插入body
        document.body.appendChild(link)
        //js方式点击链接，触发下载
        link.click()
        //关闭弹出层
        close()
    })
    .finally(()=>{
        loading.value = false
    })
}

defineProps({
    tabbars:Array
})

defineExpose({
    open
})

</script>