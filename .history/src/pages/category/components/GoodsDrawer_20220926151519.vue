<template>
    <FormDrawer ref="formDrawerRef" />
    
</template>

<script setup>
    import {ref} from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';

const formDrawerRef = ref(null)

const open = ()=>{
    formDrawerRef.value.open()
}
</script>