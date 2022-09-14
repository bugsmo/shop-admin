<template>
    <el-drawer 
    v-model="showDrawer" 
    :title="title" 
    :size="size" 
    :close-on-click-modal="false" 
    :destroy-on-close="destroyOnClose">
        <div class="formDrawer">

            <div class="body">
                <slot></slot>
            </div>

            <div class="actions">
                <el-button round class="btn" type="primary">提交</el-button>
                <el-button round class="btn" type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { type } from 'windicss/utils';

const showDrawer = ref(false)

// 向父组件暴露属性
const props = defineProps({
    title: String,
    size: {
        type: String,
        default: "45%"
    },
    // element 抽屉drawer属性
    destroyOnClose:{
        type:Boolean,
        default:false
    }
})

// 打开抽屉
const open = () => showDrawer.value = true

// 关闭抽屉
const close = () => showDrawer.value = false

// 向父组件暴露方法
defineExpose({
    open,
    close
})

</script>

<style scoped>
.formDrawer {
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}

.formDrawer .body{
    flex: 1;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.formDrawer .actions{
    height: 50px;
    @apply mt-auto items-center flex;
}
</style>