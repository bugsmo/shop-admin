<template>
    <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">
        <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]" label-width="80px" size="small">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input type="password" v-model="form.oldpassword" placeholder="请输入旧密码" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button round class="btn" type="primary" @click="onSubmit" :loading="loading">提 交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
    import { ref } from "vue";
    const 
</script>