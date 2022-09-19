<template>
            <div class="flex items-center justify-between mb-4">
                <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
                <el-tooltip effect="dark" content="刷新" placement="top">
                    <el-button>
                        <el-icon :size="20">
                            <Refresh @click="getData()" />
                        </el-icon>
                    </el-button>
                </el-tooltip>
            </div>
</template>