import { isArray } from "element-plus/es/utils"

function hasPermission(value, el = false){
    if(!Array.isArray(value)){
        throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
    }

}

export default {
    install(app){
        app.directive('permission',{
            //el 元素 binding 输入的数组
            mounted(el,binding) {
                
            },
        })
    }
}