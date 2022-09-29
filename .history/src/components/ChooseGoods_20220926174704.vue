<template>
    <el-dialog
        title="商品选择"
        v-model="dialogVisible"
        width="80%"
        >
        内容
        <template #footer>
        <span>
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="submit">确认</el-button>
        </span>
        </template>
    </el-dialog>
    
</template>
<script setup>
    import {ref} from 'vue';

const dialogVisible = ref(false)

const submit = ()=>{

}

function close(){
    dialogVisible.value = false
}

const open = ()=> {
    dialogVisible.value = false
}

defineExpose({
    open
})
</script>