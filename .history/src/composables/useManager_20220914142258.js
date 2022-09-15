import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showModal, toast } from '~/composables/utils'
import { logout, updatepassword } from '~/api/manager'

export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    // 修改密码
    const formDrawerRef = ref(null)
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

    const formRef = ref(null)
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            // 验证通过后，调用登录接口前，按钮添加loading状态
            formDrawerRef.value.showLoading()
            updatepassword(form)
                .then(() => {
                    toast("修改密码成功，请重新登录")
                    store.dispatch("logout")
                    // 跳转回登录页面
                    router.push("/login")
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading()
                })
        })
    }

    const openRePassword = () => formDrawerRef.value.open();

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePassword
    }
}

// 退出登录功能
export function useLogout(){
    
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

    return handleLogout
}