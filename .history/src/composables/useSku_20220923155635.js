import {ref} from 'vue';

//商品ID
export const goodsId = ref(0)

//规格选项列表
export const sku_card_list = ref([])

//初始化规格选项列表
export function initSkuCardList(d){
    // console.log(d);
    sku_card_list.value = d.goodsSkusCard.map(item=>{
        //修改name失败会变回text的值，即原始值name值
        item.text = item.name
        item.loading = false
        item.goodsSkusCardValue.map(v=>{
            //修改value失败会变回text的值，即原始值value值
            v.text = v.value || "属性值"
            return v
        })
        return item
    })
}

//初始化规格的值
export function initSkuCardItem(id){
    console.log(id);
}