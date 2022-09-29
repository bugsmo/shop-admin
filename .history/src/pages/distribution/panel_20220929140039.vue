<template>
    <div>
        
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { getAgentStatistics } from '~/api/distribution'

const list = ref([])
const loading = ref(false)
loading.value = true

getAgentStatistics()
.then(res=>{
    list.value = res
    console.log(res);
})
.finally(()=>{
    loading.value = false
})
</script>