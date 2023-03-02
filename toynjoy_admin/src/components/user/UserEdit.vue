<template>
    <el-divider>基本信息</el-divider>
    <el-form v-loading="other.isloading" ref="userForm" :model="userFormData" :rules="userFormRules" label-width="60">
        <el-row>
            <el-col :span="6">
                <el-row>
                    <el-form-item label="头像">
                        <el-avatar :size="130" :src="getImageUrl(`user/${userFormData.virtualImage}`)" />
                    </el-form-item>
                </el-row>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="账号">
                            <el-input v-model="userFormData.username" disabled />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="userFormData.nickname" :disabled="!other.emailVerification" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="邮箱">
                            <el-input v-model="userFormData.email" :disabled="!other.emailVerification" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="等级" prop="lv">
                            <el-input-number v-model.number="userFormData.lv" :min="0" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="创建日期" label-width="80">
                    <el-date-picker v-model="userFormData.registerTime" type="date" disabled />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="用户类型" label-width="80" prop="typeId">
                    <el-select v-model="userFormData.typeId">
                        <el-option v-for="ut in userTypes" :label="ut.typeName" :value="ut.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="状态" prop="state">
                    <el-select v-model="userFormData.state">
                        <el-option label="禁用" :value="0" />
                        <el-option label="启用" :value="1" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-divider>详细信息</el-divider>
    <el-form v-loading="other.isloading" ref="userInfoForm" :model="userInfoFormData" :rules="userInfoFormRules"
        label-width="60px">
        <el-row>
            <el-col>
                <el-form-item label="签名" label-width="70px" prop="signature">
                    <el-input v-model="userInfoFormData.signature" :disabled="!other.emailVerification" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="身份证" label-width="70px" prop="idcard">
                    <el-input v-model="userInfoFormData.idcard" :disabled="!other.emailVerification" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="userInfoFormData.birthday" type="date" :disabled="!other.emailVerification" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="userInfoFormData.gender" :disabled="!other.emailVerification">
                        <el-option label="男" value="boy" />
                        <el-option label="女" value="girl" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16">
                <el-form-item label="地址" label-width="70px" prop="address">
                    <el-input v-model="userInfoFormData.address" :disabled="!other.emailVerification" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="手机号" label-width="70px" prop="phone">
                    <el-input v-model="userInfoFormData.phone" :disabled="!other.emailVerification" />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-divider></el-divider>
    <el-row>
        <el-col class="message" :span="20">
            <span>部分信息需要验证后才能修改，</span>
            <span class="click" @click="openEmailVerificationDialog">点此进行验证</span>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" @click="formSubmit()">保存</el-button>
        </el-col>
        <el-col :span="2">
            <el-button @click="formReset()">清空</el-button>
        </el-col>
    </el-row>
    <!-- 邮箱验证弹dialog -->
    <el-dialog v-model="other.emailVerificationDialog" width="300px" title="已发送验证码至绑定邮箱" append-to-body align-center>
        <el-form ref="emailVerificationForm" :model="emailVerificationFormData" :rules="emailVerificationFormRules">
            <el-form-item prop="verificationCode">
                <el-input v-model="emailVerificationFormData.verificationCode" placeholder="请输入验证码">
                    <template #append>
                        <el-button @click="emailVerificationSubmit">确定</el-button>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { getUserTypes, getInfoByName, updateUser, updateUserInfo } from '@/api/user'
import { getVerificationCode } from '@/api/system'
import { getImageUrl } from '@/utils/request'
import { ElMessage } from 'element-plus'

export default {
    name: 'UserEdit',
    setup() {
        const store = useStore();

        // 身份证验证
        var validatorIdCard = (rule, value, callback) => {
            if (!value == null) {
                // 地区
                var aCity = {
                    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
                    21: "辽宁", 22: "吉林", 23: "黑龙江",
                    31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
                    41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
                    51: "四川", 52: "贵州", 53: "云南", 54: "西藏",
                    61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
                    71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
                };
                // 验证长度
                if (!/^\d{17}(\d|x)$/i.test(value)) {
                    callback(new Error('您输入的身份证号长度或格式错误'));
                    return;
                }
                // 验证前两位是否为省份代码
                value = value.replace(/x$/i, "a");
                if (aCity[parseInt(value.substr(0, 2))] == null) {
                    callback(new Error('您输入的身份证号长度或格式错误'));
                    return;
                }
                // 身份证上的出生年月校验
                var sBirthday = value.substr(6, 4) + "-" + Number(value.substr(10, 2)) + "-" + Number(value.substr(12, 2));
                var d = new Date(sBirthday.replace(/-/g, "/"));
                if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
                    callback(new Error('您输入的身份证号不合法'));
                    return;
                }
                // 身份证校验位判断
                var iSum = 0;
                for (var i = 17; i >= 0; i--) {
                    iSum += (Math.pow(2, i) % 11) * parseInt(value.charAt(17 - i), 11);
                }
                if (iSum % 11 != 1) {
                    callback(new Error('您输入的身份证号不合法'));
                    return;
                }
            }
            callback()
        };

        const data = reactive({
            userTypes: [],
            userFormData: {
                username: null,
                password: null,
                nickname: null,
                email: null,
                lv: null,
                virtualImage: null,
                registerTime: null,
                state: null,
                typeId: null,
            },
            userFormRules: {
                password: [{ required: true, message: "请填写密码" }],
                nickname: [{ required: true, message: "请填写昵称" }],
                lv: [{ required: true, message: "请填写等级" }, { type: 'number', message: '等级只能是数字' }],
                state: [{ required: true, message: "请选择状态" }],
                typeId: [{ required: true, message: "请选择用户类型" }]
            },
            userInfoFormData: {
                id: null,
                userName: null,
                signature: null,
                wrapperImage: null,
                gender: null,
                birthday: null,
                idcard: null,
                address: null,
                phone: null
            },
            userInfoFormRules: {
                signature: [{ required: true, message: "请填写签名" }],
                idcard: [{ validator: validatorIdCard }],
                phone: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "手机号格式不正确" }]
            },
            emailVerificationFormData: {
                verificationCode: ''
            },
            emailVerificationFormRules: {
                verificationCode: [{ required: true, message: "请填写验证码" }]
            },
            other: {
                emailVerification: false,
                emailVerificationDialog: false,
                verificationCodes: [],
                isloading: false
            }
        });

        const doms = {
            userForm: ref(),
            userInfoForm: ref(),
            emailVerificationForm: ref()
        }

        const eventCallBacks = {
            // 发送验证码 并 打开验证码输入框
            openEmailVerificationDialog: async () => {
                if (!data.other.emailVerification) {
                    let code = await getVerificationCode(data.userFormData.email, "账户信息变更");
                    data.other.verificationCodes.push(code);
                    data.other.emailVerificationDialog = true;
                } else {
                    ElMessage.success("验证已通过");
                }
            },
            // 提交表单
            formSubmit: async () => {
                let userValid = await doms.userForm.value.validate((valid) => valid);
                let userInfoValid = await doms.userInfoForm.value.validate((valid) => valid);

                if (userValid && userInfoValid) {
                    data.other.isloading = true;
                    let userReponse = await updateUser(data.userFormData);
                    let userInfoReponse = await updateUserInfo(data.userInfoFormData);

                    if (!userReponse) {
                        ElMessage.error("基本信息更新失败");
                    }
                    if (!userInfoReponse) {
                        ElMessage.error("详细信息更新失败");
                    }
                    if (userReponse && userInfoReponse) {
                        ElMessage.success("更新成功");
                    }
                    data.other.isloading = false;
                }
            },
            // 清空表单
            formReset: () => {
                if (data.other.emailVerification) {
                    doms.userForm.value.resetFields();
                    doms.userInfoForm.value.resetFields();
                } else {
                    ElMessage.warning("请先进行授权验证");
                }
            },
            // 验证码验证
            emailVerificationSubmit: () => {
                doms.emailVerificationForm.value.validate((valid) => {
                    if (valid) {
                        let code = data.emailVerificationFormData.verificationCode;
                        let findCode = data.other.verificationCodes.find(item => item.toUpperCase() === code.toUpperCase());
                        if (findCode) {
                            ElMessage.success("验证成功");
                            data.other.emailVerification = true;
                            data.other.emailVerificationDialog = false;
                        } else {
                            ElMessage.error("验证码错误");
                        }
                    }
                });
            }
        }

        onMounted(async () => {
            data.other.isloading = true;
            data.userTypes.push(...await getUserTypes());
            // 基本信息 表单填充
            let user = store.state.user.editUser;
            if (user) {
                Object.keys(data.userFormData).forEach(key => {
                    data.userFormData[key] = user[key];
                });
            }
            // 详细信息 表单填充
            let userInfo = await getInfoByName(user.username);
            if (userInfo) {
                Object.keys(data.userInfoFormData).forEach(key => {
                    data.userInfoFormData[key] = userInfo[key];
                });
            }
            data.other.isloading = false;
        });

        return {
            ...data,
            ...doms,
            ...eventCallBacks,
            getImageUrl
        }
    }
}
</script>

<style scoped>
.message {
    font-size: 12px;
    color: #999;
    user-select: none;
}

.message .click {
    color: cornflowerblue;
    cursor: pointer;
    transition: 0.1s;
}

.message .click:hover {
    color: rgb(44, 107, 223);
}
</style>