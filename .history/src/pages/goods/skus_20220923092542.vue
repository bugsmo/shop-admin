<template>
    <FormDrawer ref="formDrawerRef" title="设置商品详情" destroy-on-close @submit="submit">
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
    content:"",
})

const goodsId=ref(0)
const open = (row)=>{
    goodsId.value = row.id
    row.skusLoading = true
    readGoods(goodsId.value)
    .then(res=>{
        form.content = res.content
        formDrawerRef.value.open()
    })
    .finally(()=>{
        row.skusLoading = false
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