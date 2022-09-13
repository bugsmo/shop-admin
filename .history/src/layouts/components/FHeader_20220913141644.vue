<template>
    <div class="f-header">
        <el-icon>
            <ElemeFilled />
        </el-icon>
        <span class="logo">莫维龙</span>
        <el-icon>
            <Fold />
        </el-icon>
        <el-icon>
            <Refresh />
        </el-icon>

        <div class="ml-auto">
            <el-icon>
                <FullScreen />
            </el-icon>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
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
    </div>
</template>

<script setup>
    import store from '~/store';
</script>

<style>
    .f-header{
        @apply flex items-center bg-indigo-500 text-light-50 fixed top-0 left-0 right-0;
        height: 64px;
    }

    .logo{
        width: 250px;
        @apply flex justify-center items-center text-xl;
    }
</style>