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

    <!-- <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">
        <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]" label-width="80px" size="small">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input type="password" v-model="form.oldpassword" placeholder="请输入旧密码" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button round class="btn" type="primary" @click="onSubmit" :loading="loading">提 交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer> -->

    <form-drawer ref="formDrawerRef">
        <div style="height:1000px"></div>
    </form-drawer>

</template>

<script setup>
import FormDrawer from '~/components/FormDrawer.vue'
import { showModal, toast } from '~/composables/utils'
import { logout, updatepassword } from '~/api/manager'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue'


const { isFullscreen, toggle } = useFullscreen()



// 刷新功能
function handleReFresh() {
    // 原生js方法
    location.reload()
}

const router = useRouter()
const store = useStore()

// 修改密码
const formDrawerRef = ref(null)
// const showDrawer = ref(false)

// do not use same name with ref
const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
})

const rules = {
    oldpassword: [
        { required: true, message: '旧密码必填', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '新密码必填', trigger: 'blur' }
    ],
    repassword: [
        { required: true, message: '确认密码必填', trigger: 'blur' }
    ]
}

// 监听下拉菜单事件
const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout();
            break;
        case "rePassword":
            // showDrawer.value = true;
            formDrawerRef.value.open();
            break;
    }
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
        updatepassword(form)
            .then(() => {
                toast("修改密码成功，请重新登录")
                store.dispatch("logout")
                // 跳转回登录页面
                router.push("/login")
            })
            .finally(() => {
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