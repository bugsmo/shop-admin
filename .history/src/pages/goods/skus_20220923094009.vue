<template>
    <FormDrawer ref="formDrawerRef" title="设置商品详情" destroy-on-close @submit="submit">
        <el-form :model="form">
            <el-form-item label="规格类型">
                <el-radio-group v-model="form.sku_type" @change="">
                    <el-radio :label="0">
                        单规格
                    </el-radio>
                    <el-radio :label="1">
                        多规格
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="市场价格">
                <el-input v-model="form.sku_value.oprice" style="width:35%;">
                <template #append>
                    元
                </template>
                </el-input>
                
            </el-form-item>
            <el-form-item label="销售价格">
            </el-form-item>
            <el-form-item label="成本价格">
            </el-form-item>
            <el-form-item label="商品重量">
            </el-form-item>
            <el-form-item label="商品体积">
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>
<script setup>
import  { ref,reactive } from 'vue'
import FormDrawer from '~/components/FormDrawer.vue';
import { readGoods, updateGoodsSkus } from '~/api/goods.js'
import { toast } from '../../composables/utils';

const formDrawerRef = ref(null)

const form = reactive({
    sku_type: 0,
    sku_value: {
        "oprice": 0,
        "pprice": 0,
        "cprice": 0,
        "weight": 0,
        "volume": 0
    }
})

const goodsId=ref(0)
const open = (row)=>{
    goodsId.value = row.id
    row.skusLoading = true
    readGoods(goodsId.value)
    .then(res=>{
        form.sku_type = res.sku_type
        form.sku_value = res.sku_value || {
            "oprice": 0,
            "pprice": 0,
            "cprice": 0,
            "weight": 0,
            "volume": 0
        }
        formDrawerRef.value.open()
    })
    .finally(()=>{
        row.skusLoading = false
    })
    
}

const emit = defineEmits(["reloadData"])

const submit = ()=>{
    formDrawerRef.value.showLoading()
    updateGoodsSkus(goodsId.value,form)
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