
// 退出登录功能
export function handleLogout() {
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