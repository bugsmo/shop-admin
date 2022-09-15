<template>
    <div>
        后台首页
        {{ $store.state.user.username }}
    </div>
</template>

<script setup>
    import {ref} from 'vue';
import { getStatistics1 } from '~/api/index.js';

getStatistics1()
.then((res)=>{
    const panels = ref([])
    console.log(res);
})
</script>