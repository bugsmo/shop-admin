<template>
    <el-drawer title="物流信息" v-model="dialogVisible" size="40%">
        <el-card shadow="never">
            <div class="flex items-center">
                <el-image :src="info.logo" fit="fill" :lazy="true" style="width:50px;height:50px;" class="rounded border"></el-image>
                
            </div>
        </el-card>
        
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { getShipInfo } from '~/api/order'
import { toast } from '~/composables/utils';

const dialogVisible = ref(false)
const info = ref({})
const open = (id) => {
    return getShipInfo(id)
    .then(res=>{
        // console.log(res);
        if(res.status != 0){
            return toast(res.msg,"error")
        }
        info.value = res.result
        dialogVisible.value = true
    })
}
const close = () => dialogVisible.value = false


defineExpose({
    open
})
</script>