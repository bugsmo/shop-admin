<template>
    <FormDrawer ref="formDrawerRef" title="推荐商品"/>

</template>

<script setup>
    import {ref} from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import { getCategoryGoods } from '~/api/category.js'

const formDrawerRef = ref(null)

const open = (item)=>{
    getCategoryGoods(item.id)
    .then(res=>{

    })
    .finally(()=>{
        
    })
    formDrawerRef.value.open()
}

defineExpose({
    open
})
</script>