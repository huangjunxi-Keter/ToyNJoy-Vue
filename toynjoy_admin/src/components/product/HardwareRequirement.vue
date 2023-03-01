<template>
    <el-form v-loading="other.isloading" ref="hardwareRequirementForm" :model="hardwareRequirementFormData"
        label-width="110">
        <el-row>
            <el-col :span="13">
                <el-form-item label="操作系统：" prop="os">
                    <el-input v-model="hardwareRequirementFormData.os" placeholder="最低配置" />
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label-width="20px" prop="os1">
                    <el-input v-model="hardwareRequirementFormData.os1" placeholder="推荐配置" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13">
                <el-form-item label="处理器：" prop="cpu">
                    <el-input v-model="hardwareRequirementFormData.cpu" placeholder="最低配置" />
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label-width="20px" prop="cpu1">
                    <el-input v-model="hardwareRequirementFormData.cpu1" placeholder="推荐配置" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13">
                <el-form-item label="内存：" prop="ram">
                    <el-input v-model="hardwareRequirementFormData.ram" placeholder="最低配置" />
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label-width="20px" prop="ram1">
                    <el-input v-model="hardwareRequirementFormData.ram1" placeholder="推荐配置" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13">
                <el-form-item label="显卡：" prop="gpu">
                    <el-input v-model="hardwareRequirementFormData.gpu" placeholder="最低配置" />
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label-width="20px" prop="gpu1">
                    <el-input v-model="hardwareRequirementFormData.gpu1" placeholder="推荐配置" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13">
                <el-form-item label="DirectX 版本：" prop="directX">
                    <el-input v-model="hardwareRequirementFormData.directX" placeholder="最低配置" />
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label-width="20px" prop="directX1">
                    <el-input v-model="hardwareRequirementFormData.directX1" placeholder="推荐配置" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20"></el-col>
            <el-col :span="2">
                <el-button type="primary" @click="hardwareRequirementFormSubmit(hardwareRequirementForm)">保存</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="hardwareRequirementFormReset(hardwareRequirementForm)">清空</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getHardwareRequirement, updateHardwareRequirement } from '@/api/product'
import { ElMessage } from 'element-plus'

export default {
    name: 'HardwareRequirement',
    setup() {
        const store = useStore();

        // 绑定数据
        const data = reactive({
            hardwareRequirementFormData: {
                id: null,
                productId: null,
                os: '',
                os1: '',
                cpu: '',
                cpu1: '',
                ram: '',
                ram1: '',
                gpu: '',
                gpu1: '',
                directX: '',
                directX1: ''
            },
            hardwareRequirementFormRules: {
                os: [{ required: true, message: "请填写最低操作系统" }],
                os1: [{ required: true, message: "请填写推荐操作系统" }],
                cpu: [{ required: true, message: "请填写最低处理器" }],
                cpu1: [{ required: true, message: "请填写推荐处理器" }],
                ram: [{ required: true, message: "请填写最低运行内存" }],
                ram1: [{ required: true, message: "请填写推荐运行内存" }],
                gpu: [{ required: true, message: "请填写最低显卡" }],
                gpu1: [{ required: true, message: "请填写推荐显卡" }],
                directX: [{ required: true, message: "请填写最低 DirectX 版本" }],
                directX1: [{ required: true, message: "请填写推荐 DirectX 版本" }]
            },
            other: {
                isloading: false
            }
        })

        // DOM
        const doms = {
            hardwareRequirementForm: ref()
        }

        // 事件回调
        const eventCallbacks = {
            hardwareRequirementFormSubmit(formRef) {
                formRef.validate(async (valid) => {
                    if (valid) {
                        if (await updateHardwareRequirement(data.hardwareRequirementFormData)) {
                            ElMessage.success("保存成功");
                        } else {
                            ElMessage.error("保存失败");
                        }
                    }
                });
            },
            hardwareRequirementFormReset(formRef) {
                let id = data.hardwareRequirementFormData.id;
                let pid = data.hardwareRequirementFormData.productId;
                formRef.resetFields();
                data.hardwareRequirementFormData.id = id;
                data.hardwareRequirementFormData.productId = pid;
            }
        }

        onMounted(async () => {
            data.other.isloading = true;
            data.hardwareRequirementFormData.productId = store.state.product.productData.id;
            if (data.hardwareRequirementFormData.productId) {
                let hardwareRequirement = await getHardwareRequirement(data.hardwareRequirementFormData.productId);
                if (hardwareRequirement) {
                    Object.keys(data.hardwareRequirementFormData).forEach(key => {
                        data.hardwareRequirementFormData[key] = hardwareRequirement[key];
                    });
                }
            }
            data.other.isloading = false;
        });

        return {
            ...data,
            ...doms,
            ...eventCallbacks
        }
    }
}
</script>

<style scoped></style>