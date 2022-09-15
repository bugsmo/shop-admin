<template>
   {{d.num}}
</template>

<script setup>
    import { reactive } from 'vue';
    import gsap from 'gsap';

    //参数，默认0
    const props = defineProps({
        value:Number,
        default:0
    })

    //默认0
    const d = reactive({
        num:0
    })
</script>