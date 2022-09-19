<template>
   {{d.num}}
</template>

<script setup>
    import { reactive } from 'vue';
    import gsap from 'gsap';

    const props = defineProps({
        value:Number,
        default:0
    })

    const d = reactive({
        num:0
    })
</script>