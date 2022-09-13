<template>
    <div class="flex">
        <el-icon>
            <ElemeFilled />
        </el-icon>
        <span>莫维龙</span>
        <el-icon>
            <Fold />
        </el-icon>
        <el-icon>
            <Refresh />
        </el-icon>

        <div>
            <el-icon>
                <FullScreen />
            </el-icon>
        </div>

        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="25" :src="$store.state.user.avatar" />
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
    import store from '~/store';
</script>