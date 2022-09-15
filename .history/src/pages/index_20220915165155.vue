<template>
    <div>
        后台首页
        {{ $store.state.user.username }}
    </div>
</template>

<script setup>
import { getStatistics1 } from '~/api/index.js';

getStatistics1()
.then((res)={
    console.log(res);
})
</script>