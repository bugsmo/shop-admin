<template>
    <div v-for="(tag, index) in item.goodsSkusCardValue" :key="index">
        {{tag.value}}
    </div>
</template>
<script setup>
import { initSkuCardItem } from '~/composables/useSku.js'

const props = defineProps({
    skuCardId:[Number,String]
})

const item = initSkuCardItem(props.skuCardId)
</script>