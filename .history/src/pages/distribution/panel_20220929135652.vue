<template>
    <div>
        
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { getAgentStatistics } from '~/api/distribution'

const loading = ref(false)
loading.value = true
getAgentStatistics()
.then(res=>{
    console.log(res);
})
.finally(()=>{
    loading.value = false
})
</script>