<template>
    <div v-if="modelValue">
        <el-image v-if="typeof modelValue == 'string'" :src="modelValue" fit="cover" class="w-[100px] h-[100ox] rounded border mr-2"></el-image>
        <div v-else class="flex flex-wrap">
            <div class="relative mx-1 mb-2 w-[100px] h-[100ox]" v-for="(url, index) in modelValue" :key="index">
                <el-icon class="absolute right-[5px] top-[5px] cursor-pointer bg-white rounded" style="z-index:10;" @click="removeImage(url)"><CircleClose/></el-icon>
                <el-image :src="url" fit="cover"
                    class="w-[100px] h-[100ox] rounded border mr-2"></el-image>
            </div>
        </div>
    </div>
    <div class="choose-image-btn" @click="open">
        <el-icon :size="25" class="text-gray-500">
            <Plus />
        </el-icon>
    </div>
    <!-- 弹出窗口 -->
    <el-dialog title="选择图片" v-model="dialogVisiable" width="80%" top="5vh">
        <!-- 复用图库 -->
        <el-container class="bg-white rounded" style="height:70vh;">
            <el-header class="image-header">
                <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
                <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
            </el-header>
            <el-container>
                <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
                <ImageMain :limit="limit" ref="ImageMainRef" openChoose @choose="handleChoose" />
            </el-container>
        </el-container>
        <template #footer>
            <span>
                <el-button @click="dialogVisiable = false">取消</el-button>
                <el-button type="primary" @click="submit">确认</el-button>
            </span>
        </template>
    </el-dialog>

</template>
<script setup>
import { ref } from 'vue';
import ImageAside from '~/components/ImageAside.vue';
import ImageMain from '~/components/ImageMain.vue';
import { toast } from '~/composables/utils';

const dialogVisiable = ref(false)



const open = () => {
    dialogVisiable.value = true
}

const close = () => {
    dialogVisiable.value = false
}

const ImageAsideRef = ref(null)
const handleOpenCreate = ()=>{
    ImageAsideRef.value.handleCreate()
}

const ImageMainRef=ref(null)
const handleAsideChange=(imageClassId)=>{
    ImageMainRef.value.loadData(imageClassId)
}

const handleOpenUpload=()=>{
    ImageMainRef.value.openUploadFile()
}

//实现v-model="form.avatar"
// update事件动态更新modelValue的值
const props = defineProps({
    modelValue:[String,Array],
    limit:{
        type:Number,
        default:1
    }
})
const emit = defineEmits(["update:modelValue"])

//接收选择的图片url
let urls = []
const handleChoose=(e)=>{
    urls = e.map(o=>o.url)
}

const submit = () => {
    let value = []
    if(props.limit == 1){
        value = urls[0]
    }else{
        value = [...props.modelValue, ...urls]
        if (value.length > props.limit){
            toast('最多还能选择' + (props.limit - props.modelValue) + '张图片')
        }
    }
    if(urls.length){
       emit("update:modelValue",urls[0])
    }
    close()
}

const removeImage = (url)=>{
    emit("update:modelValue", props.modelValue.filter(o=>o !=url))
}
</script>
<style>
.choose-image-btn {
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: bg-gray-100;
}
.image-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}
</style>