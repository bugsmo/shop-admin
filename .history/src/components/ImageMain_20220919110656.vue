<template>
    <el-main class="image-main">
        <div class="top p-2">
            <el-row :gutter="10">
                <el-col :span="6" :offset="0" v-for="(item, index) in imageList" :key="index">
                    <el-card shadow="hover" :class="{ 'border-blue-500':item.checked}" class="relative" :body-style="{padding:0}">
                        <el-image :src="item.url" fit="cover" class="w-full h-[150px]  mb-3"
                            :preview-src-list="[item.url]" :initial-index="0"></el-image>
                        <div class="image-title">{{item.name}}</div>
                        <div class="flex justify-center items-center p-2">
                            <el-checkbox v-if="openChoose" v-model="item.checked" @change="handleChooseChange(item)"></el-checkbox>
                            
                            <el-button class="!m-2" type="primary" size="small" text @click="handleEdit(item)">重命名</el-button>
                            <el-popconfirm title="是否要删除该图片?" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelete(item.id)">
                                <template #reference>
                                    <el-button type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>

                </el-col>
            </el-row>

        </div>
        <div class="bottom" :loading="loading">
            <el-pagination background layout="prev,pager, next" :total="totalCount" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-main>

    <el-drawer v-model="drawer" title="上传图片">
        <UploadFile :data="{ image_class_id }" @success="handleUploadSuccess"/>
    </el-drawer>
</template>

<script setup>
import { ref,computed } from 'vue';
import { getImageList, updateImage, deleteImage } from '~/api/image.js'
import { showPrompt, toast } from '~/composables/utils.js'
import UploadFile from '~/components/UploadFile.vue'

//加载动画
const loading = ref(false)
//分页
const currentPage = ref(1)
const totalCount = ref(0)
const limit = ref(10)
//图库列表
const imageList = ref([])
const image_class_id = ref(0)

//获取图库数据
function getData(page = null) {
    //输入为数字
    if (typeof page == "number") {
        currentPage.value = page
    }

    loading.value = true
    getImageList(image_class_id.value, currentPage.value)
        .then(res => {
            imageList.value = res.list.map(o=>{
                o.checked = false
                return o
            })
            totalCount.value = res.totalCount
        })
        .finally(() => {
            loading.value = false
        })
}

//根据分类id重新加载图片列表
const loadData = (id) => {
    currentPage.value = 1
    image_class_id.value = id
    getData()
}

//重命名
const handleEdit = (item) => {
    showPrompt("重命名", item.name)
        .then(({ value }) => {
            loading.value = true
            updateImage(item.id, value)
                .then(res => {
                    toast("修改成功")
                    getData()
                })
                .finally(() => {
                    loading.value = false
                })
        })
}

//删除图片
const handleDelete = (id) => {
    loading.value = true
    deleteImage([id])
        .then(res => {
            toast("删除成功")
            getData(1)
        })
        .finally(() => {
            loading.value = false
        })
}

//上传图片
const drawer = ref(false)
const openUploadFile = ()=>{
    drawer.value = true
}

//上传成功
const handleUploadSuccess = ()=>{
    getData(1)
}

defineProps({
    openChoose:{
        type:Boolean,
        default:false
    }
})

//选择图片，只能选择一张
const emit = defineEmits(["choose"])
const checkedImage = computed(()=>imageList.value.filter(o=>o.checked))
const handleChooseChange = (item)=>{
    if(item.checked && checkedImage.value.length > 1){
        item.checked =false
        return toast("只能选择1张","error")
    }
    emit("choose", checkedImage.value)
}

defineExpose({
    loadData,
    openUploadFile
})
</script>

<style>
.image-main {
    position: relative;
}

.image-main .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-main .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    @apply flex justify-center items-center;
}

.image-title {
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-1 py-2;
}
</style>