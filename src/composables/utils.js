import { ElNotification,ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

// 消息提示
export function toast(message, type = "success", dangerouslyUseHTMLString = true) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

export function showModal(content = "提示内容",type="warning",title=""){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type,
        }
      )
}

//弹出输入框
export function showPrompt(tip,value=""){
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
})
}

// 显示全局loading
export function showFullLoading(){
  nprogress.start()
}

// 隐藏全局loading
export function hideFullLoading(){
  nprogress.done()
}

//将query对象转为url参数
export function queryParams(query){
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join("&")
  r = r ? ("?" + r) : ""
  return r
}

//上移 商品规格使用
export function useArrayMoveUp(arr,index){
  swapArray(arr, index, index-1)
}
//下移 商品规格使用
export function useArrayMoveDown(arr,index){
  swapArray(arr, index, index+1)
}

//数组元素位置调换
//原始数组 [1,2,3,4]
// [2,2,3,4]
// [2,1,3,4]
function swapArray(arr,index1,index2){
  // console.log(arr);
  arr[index1] = arr.splice(index2,1,arr[index1])[0]
  return arr
}

//sku排列算法，规格值表格数据
export function cartesianProductOf(){
  return Array.prototype.reduce.call(arguments, function(a,b){
    var ret = [];
    a.forEach(function (a) {
      b.forEach(function(b){
        ret.push(a.concat([b]));
      });
    });
    return ret
  },[
    []
  ]);
}