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
    panels.value = res.panels
    console.log(panels.value);
})
</script>