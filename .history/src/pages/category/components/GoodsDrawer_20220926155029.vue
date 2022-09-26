<template>
    <FormDrawer ref="formDrawerRef" title="推荐商品"/>

</template>

<script setup>
    import {ref} from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import { getCategoryGoods } from '~/api/category.js'

const formDrawerRef = ref(null)
const categoryId = ref(0)
const open = (item)=>{
    categoryId.value = item.id
    getData()
    formDrawerRef.value.open()
}

function getData(){
    return getCategoryGoods(categoryId.value)
        .then(res => {

        })
        .finally(() => {

        })
}

defineExpose({
    open
})
</script>