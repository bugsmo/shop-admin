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
                <el-button type="primary" @click="onSubmit">导出</el-button>
            </el-form-item>
        </el-form>
        
    </el-drawer>
    
</template>
<script setup>
    import {ref,reactive} from 'vue';

const dialogVisible = ref(false)

const open = ()=> dialogVisible.value = true
const close = ()=> dialogVisible.value = false

const form = reactive({
    tab:null,
    time:""
})

const onSubmit = ()=>{

}

defineProps({
    tabbars:Array
})

defineExpose({
    open
})

</script>