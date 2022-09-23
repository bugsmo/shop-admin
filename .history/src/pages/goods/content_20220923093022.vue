<template>
    <FormDrawer ref="formDrawerRef" title="设置商品规格" destroy-on-close @submit="submit" size="70%">
        <el-form :model="form">
            <el-form-item>
                <Editor v-model="form.content" />
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>
<script setup>
import  { ref,reactive } from 'vue'
import FormDrawer from '~/components/FormDrawer.vue';
import { readGoods, updateGoods } from '~/api/goods.js'
import { toast } from '../../composables/utils';
import Editor from '~/components/Editor.vue';

const formDrawerRef = ref(null)

const form = reactive({
    sku_type:0,
    sku_value:{
        oprice:0,
        pprice:0,
        cprice:0,
        weight:0,
        volume:0
    }
})

const goodsId=ref(0)
const open = (row)=>{
    goodsId.value = row.id
    row.contentLoading = true
    readGoods(goodsId.value)
    .then(res=>{
        form.content = res.content
        formDrawerRef.value.open()
    })
    .finally(()=>{
        row.contentLoading = false
    })
    
}

const emit = defineEmits(["reloadData"])

const submit = ()=>{
    formDrawerRef.value.showLoading()
    updateGoods(goodsId.value,form)
    .then(res=>{
        toast("设置商品详情成功")
        emit('reloadData')
        formDrawerRef.value.close()
    })
    .finally(()=>{
        formDrawerRef.value.hideLoading()
    })
}

defineExpose({
    open
})
</script>