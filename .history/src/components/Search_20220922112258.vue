<template>
    <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
        <el-row :gutter="20">
            <el-col :span="8" :offset="0">
                <el-form-item label="商品名称">
                    <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0" v-if="showSearch">
                <el-form-item label="商品分类" prop="category_id">
                    <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" clearable>
                        <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="showSearch ?0:8">
                <div class="flex items-center justify-end">
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <el-button @click="resetSearchForm">重置</el-button>
                    <el-button text @click="showSearch = !showSearch">
                        {{ showSearch ? '收起':'展开'}}
                        <el-icon>
                            <ArrowUp v-if="showSearch" />
                            <ArrowDown v-else />
                        </el-icon>
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </el-form>
</template>
<script setup>
    import {ref} from 'vue';
const showSearch = ref(false)    
</script>

