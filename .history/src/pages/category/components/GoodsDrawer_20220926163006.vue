<template>
    <FormDrawer ref="formDrawerRef" title="推荐商品">
        <el-table :data="tableData" border stripe style="width:100%;">
            <el-table-column type="index" width="50" />
            <el-table-column v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label"
                :width="col.width">
            </el-table-column>
        </el-table>
        
    </FormDrawer>

</template>

<script setup>
    import {ref} from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import { getCategoryGoods } from '~/api/category.js'

const formDrawerRef = ref(null)
const tableData = ref([])
const categoryId = ref(0)

const open = (item)=>{
    categoryId.value = item.id
    getData()
    formDrawerRef.value.open()
}

function getData(){
    return getCategoryGoods(categoryId.value)
        .then(res => {
            tableData.value = res
        })
}

defineExpose({
    open
})
</script>