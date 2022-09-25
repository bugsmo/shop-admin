<template>
    <el-drawer title="设置轮播图" v-model="dialigVisible" size="50%" destroy-on-close>
        <el-form :model="form" label-width="80px">
            <el-form-item label="轮播图">
                <ChooseImage v-model="form.banners" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
        
    </el-drawer>

</template>
<script setup>
import  { ref,reactive } from 'vue'
import ChooseImage from '~/components/ChooseImage.vue';
import { readGoods } from '~/api/goods.js'

const dialigVisible = ref(false)
const form = reactive({
    banners:[]
})

const goodsId=ref(0)
const open = (row)=>{
    goodsId.value = row.id
    readGoods(goodsId.value)
    .then(res=>{
        console.log(res);
        // console.log(res.list.map(o => o.url));
        form.banners = res.goodsBanner.map(o=>o.url)
        dialigVisible.value = true
    })
    
}
const submit = ()=>{}

defineExpose({
    open
})
</script>