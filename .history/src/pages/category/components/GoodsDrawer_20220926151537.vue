<template>
    <FormDrawer ref="formDrawerRef" title="关联商品"/>

</template>

<script setup>
    import {ref} from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';

const formDrawerRef = ref(null)

const open = ()=>{
    formDrawerRef.value.open()
}
</script>