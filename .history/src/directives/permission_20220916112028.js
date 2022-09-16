import store from '~/store'

function hasPermission(value, el = false){
    //输入的值是否数组
    if(!Array.isArray(value)){
        throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
    }
    // 判断用户的权限是否在后端返回的权限组内
    const hasAuth = value.findIndex(v=>store.state.ruleNames.includes(v)) != -1
    // 节点存在且用户没有权限
    if(el && !hasAuth){}
}

export default {
    install(app){
        app.directive('permission',{
            //el 元素 binding 输入的数组
            mounted(el,binding) {
                hasPermission(binding.value,el)
            },
        })
    }
}