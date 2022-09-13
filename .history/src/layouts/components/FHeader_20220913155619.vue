<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-2">
                <ElemeFilled />
            </el-icon>
            莫维龙
        </span>
        <el-icon class="icon-btn">
            <Fold />
        </el-icon>

        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleReFresh">
                <Refresh />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <aim v-else />
                </el-icon>
            </el-tooltip>
            
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">
        <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
            <el-form-item prop="oldpassword">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
                    <template #prefix>
                        <el-icon>
                            <User />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                    <template #prefix>
                        <el-icon>
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword">
                <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password>
                    <template #prefix>
                        <el-icon>
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button round class="btn" type="primary" @click="onSubmit" :loading="loading">登 录</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { showModal, toast } from '~/composables/utils'
import { logout } from '~/api/manager'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue'


const { isFullscreen, toggle } = useFullscreen()

// 监听下拉菜单事件
const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout();
            break;
        case "rePassword":
            showDrawer.value = true;
            break;
    }
}

// 刷新功能
function handleReFresh(){
    // 原生js方法
    location.reload()
}

const router = useRouter()
const store = useStore()

// 修改密码
const showDrawer = ref(false)

// do not use same name with ref
const form = reactive({
    oldpassword:'',
    password: '',
    repassword: '',
})

const rules = {
    username: [
        { required: true, message: '用户名必填', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码必填', trigger: 'blur' }
    ]
}

const loading = ref(false)
const formRef = ref(null)
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        // 验证通过后，调用登录接口前
        loading.value = true

        // 调用登录接口
        store.dispatch("login", form).then(res => {
            // 提示登录成功
            toast('登录成功')
            // 跳转后台首页
            router.push('/')
        }).finally(() => {
            // 无论登录成功还是失败，重置loading为false
            loading.value = false
        })
    })
}


// 退出登录功能
function handleLogout() {
    showModal("是否要退出登录？").then(res => {
        logout()
            .finally(() => {
                store.dispatch("logout")
                // 跳转回登录页面
                router.push("/login")
                // 提示退出登录成功
                toast("退出登录成功")
            })
    })
}
</script>

<style scoped>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center;
}
</style>