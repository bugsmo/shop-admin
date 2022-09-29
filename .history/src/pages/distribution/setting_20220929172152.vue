<template>
    <div v-loading="loading" class="bg-white p-4 rounded">
        <el-form :model="form" label-width="160px">
            <h5 class="bg-gray-100 mb-5 rounded">基础设置</h5>
            <el-form-item label="分销启用">
                <el-radio-group v-model="form.distribution_open">
                    <el-radio :label="0" border>
                        禁用
                    </el-radio>
                    <el-radio :label="1" border>
                        启用
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <h5 class="bg-gray-100 mb-5 rounded">返佣设置</h5>
            <el-form-item label="一级返佣比例">
                <el-input v-model="form.store_first_rebate" placeholder="一级返佣比例" style="width:30%;" type="number">
                    <template #append>%
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="二级返佣比例">
                <el-input v-model="form.store_second_rebate" placeholder="二级返佣比例" style="width:30%;" type="number">
                    <template #append>%
                    </template>
                </el-input>
            </el-form-item>

            <h5 class="bg-gray-100 mb-5 rounded">结算设置</h5>

            <el-tabs v-model="activeName">
                <el-tab-pane label="注册与访问" name="first">
                    <el-form-item label="是否允许注册会员">
                        <el-radio-group v-model="form.open_reg">
                            <el-radio :label="0" border>
                                关闭
                            </el-radio>
                            <el-radio :label="1" border>
                                开启
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="注册类型">
                        <el-radio-group v-model="form.reg_method">
                            <el-radio label="username" border>
                                普通注册
                            </el-radio>
                            <el-radio label="phone" border>
                                手机注册
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="强制密码复杂度">
                        <el-checkbox-group v-model="form.password_encrypt">
                            <el-checkbox label="0" border>数字</el-checkbox>
                            <el-checkbox label="1" border>小写字母</el-checkbox>
                            <el-checkbox label="2" border>大写字母</el-checkbox>
                            <el-checkbox label="3" border>符号</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="上传设置" name="second">
                    <el-form-item label="默认上传方式">
                        <el-radio-group v-model="form.upload_method">
                            <el-radio label="oss" border>
                                对象存储
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Bucket">
                        <el-input v-model="form.upload_config.Bucket" placeholder="Bucket" style="width:30%;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="ACCESS_KEY">
                        <el-input v-model="form.upload_config.ACCESS_KEY" placeholder="ACCESS_KEY" style="width:30%;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="SECRET_KEY">
                        <el-input v-model="form.upload_config.SECRET_KEY" placeholder="SECRET_KEY" style="width:30%;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="空间域名">
                        <el-input v-model="form.upload_config.http" placeholder="空间域名" style="width:30%;"></el-input>
                        <small class="text-gray-500 flex mt-1">请补全 http:// 或 https://</small>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="API安全" name="third">
                    <el-form-item label="是否开启API安全">
                        <el-radio-group v-model="form.api_safe">
                            <el-radio :label="0" border>
                                关闭
                            </el-radio>
                            <el-radio :label="1" border>
                                开启
                            </el-radio>
                        </el-radio-group>
                        <small class="text-gray-500 flex mt-1">api安全功能开启之后调用前端api需要传输签名串</small>
                    </el-form-item>
                    <el-form-item label="秘钥">
                        <el-input v-model="form.api_secret" placeholder="秘钥" style="width:30%;"></el-input>
                        <small
                            class="text-gray-500 flex mt-1">秘钥设置关系系统中api调用传输签名串的编码规则，以及会员token解析，请慎重设置，注意设置之后对应会员要求重新登录获取token</small>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
            <el-form-item>
                <el-button type="primary" size="default" @click="submit">保存</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { getConfig, setConfig } from '~/api/distribution'
import { toast } from '~/composables/utils';

const form = reactive({
    "distribution_open": 1, //分销启用:0禁用1启用
    "store_first_rebate": 10, //一级返佣比例：0~100
    "store_second_rebate": 20, //二级返佣比例：0~100
    "spread_banners": [
        "http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62710076cd93e.png"
    ], //分销海报图
    "is_self_brokerage": 1, //自购返佣:0否1是
    "settlement_days": 7, //结算时间（单位：天）
    "brokerage_method": "hand" //佣金到账方式:hand手动,wx微信
})

const activeName = ref("first")
const loading = ref(false)
function getData() {
    loading.value = true
    getConfig()
        .then(res => {
            for (const k in form) {
                form[k] = res[k]
            }
        })
        .finally(() => {
            loading.value = false
        })
}

getData()

const submit = () => {
    loading.value = true
    setConfig({
        ...form,
    })
        .then(res => {
            toast("修改成功")
            getData()
        })
        .finally(() => {
            loading.value = false
        })
}
</script>