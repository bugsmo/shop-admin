<template class="flex items-center justify-center">
    <el-icon :size="20" class="ml-2 mr-2">
        <component :is='modelValue'></component>
    </el-icon>
    <el-select filterable v-model="modelValue" class="m-2" placeholder="请选择图标，可搜索">
        <el-option v-for="item in icons" :key="item" :label="item" :value="item" @change="handleChange">
            <div class="flex items-center justify-between">
                <el-icon>
                    <component :is='item'></component>
                </el-icon>
                <span class="text-gray-500">{{item}}</span>
            </div>

        </el-option>
    </el-select>
</template>
<script setup>
import { ref } from 'vue'
import * as iconList from '@element-plus/icons-vue'

defineProps({
    modelValue: String
})

//element图标库
const icons = ref(Object.keys(iconList))
//emit 触发更新父组件的v-model值
const emit = defineEmits(["update:modelValue"])
const handleChange = (icon) => {
    emit("update:modelValue", icon)
}
</script>