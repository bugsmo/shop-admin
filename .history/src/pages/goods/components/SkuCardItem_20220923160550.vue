<template>
    <div v-for="(item, index) in item.goodsSkusCardValue" :key="index">
        {{item.value}}
    </div>
</template>
<script setup>
import { initSkuCardItem } from '~/composables/useSku.js'

const props = defineProps({
    skuCardId:[Number,String]
})

const item = initSkuCardItem(props.skuCardId)
</script>