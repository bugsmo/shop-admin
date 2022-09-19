<script setup>

</script>

<template>
<router-view></router-view>

  
</template>
<!-- 
    ::-webkit-scrollbar 全局滚动条样式
 -->
<style>
    body{
        @apply bg-gray-100;
    }
#nprogress .bar {
background-color: rgb(0, 255, 64)!important;;
padding: 1px;
}

::-webkit-scrollbar{
    width: 4px;
    height: 6px;
}
::-webkit-scrollbar-corner{
    display: block;
}
</style>
