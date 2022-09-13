<template>
    <div>
        后台首页
        {{ $store.state.user.username }}
        {{ $cookie.token }}
    </div>
</template>

<script setup>

</script>