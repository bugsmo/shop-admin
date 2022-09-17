<template>
    <el-aside width="200px" class="image-aside" v-loading="loading">
        <div class="top">
            <ImageAsideList :active="activeId == item.id" v-for="(item, index) in categoryList" :key="index"
                @edit="handleEdit(item)" @delete="handleDelete(item.id)" @click="handleChangeActiveId(item.id)">
                {{ item.name }}
            </ImageAsideList>
        </div>

        <div class="bottom">
            <el-pagination background layout="prev, next" :total="totalCount" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-aside>

    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="1" :max="1000" />
            </el-form-item>
        </el-form>

    </FormDrawer>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import ImageAsideList from '~/components/ImageAsideList.vue';
import { getImageClassList, createImageClass, updateImageClass, deleteImageClass } from '~/api/image_class.js'
import FormDrawer from '~/components/FormDrawer.vue';
import { toast } from '~/composables/utils';

//加载动画
const loading = ref(false)
//分类列表
const categoryList = ref([])
//分页
const currentPage = ref(1)
const totalCount = ref(0)
const limit = ref(10)

//获取图库数据
function getData(page = null) {
    //输入为数字
    if (typeof page == "number") {
        currentPage.value = page
    }
    loading.value = true
    getImageClassList(currentPage.value)
        .then(res => {
            categoryList.value = res.list
            totalCount.value = res.totalCount
            //默认选中分类
            let item = categoryList.value[0]
            if (item) {
                handleChangeActiveId(item.id)
            }
        })
        .finally(() => {
            loading.value = false
        })
}

getData()

//图库分类表单
const formDrawerRef = ref(null)
const editId = ref(0)
const drawerTitle = computed(() => editId.value ? "修改" : "新增")

//表单字段
const form = reactive({
    name: "",
    order: 50
})
//表单规则
const rules = {
    name: [
        { required: true, message: '分类名称必填', trigger: 'blur' }
    ]
}

const formRef = ref(null)
//提交
const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        formDrawerRef.value.showLoading()
        //此处返回promise对象，用fun接收
        const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)
        fun.then((res) => {
            toast(drawerTitle.value + '成功')
            getData(editId.value ? currentPage.value : 1)
            formDrawerRef.value.close()
        })
            .finally(() => formDrawerRef.value.hideLoading())
    })
}

//新增
const handleCreate = () => {
    form.name = ""
    form.order = 50
    editId.value = 0
    formDrawerRef.value.open()
}

//编辑
const handleEdit = (row) => {
    form.name = row.name
    form.order = row.order
    editId.value = row.id
    formDrawerRef.value.open()

}

//删除
const handleDelete = (id) => {
    loading.value = true
    deleteImageClass(id)
        .then(res => {
            toast("删除成功")
            getData(currentPage.value)
        })
        .finally(() => {
            loading.value = false
        })
}

//选中项，绑定分类id
const activeId = ref(0)
const emit = defineEmits(['change'])
//切换分类
function handleChangeActiveId(id){
    activeId.value = id
    emit("change",id)
}

//暴露打开新增图库分类表单
defineExpose({
    handleCreate
})

</script>
<style>
.image-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    @apply flex justify-center items-center;
}
</style>