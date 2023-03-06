<template>
  <el-form v-loading="other.loading" ref="productForm" label-width="70" :model="productFormData"
    :rules="productFormRules">
    <!-- 第一行 -->
    <el-form-item label="名称" prop="name">
      <el-input v-model="productFormData.name" />
    </el-form-item>
    <!-- 第二行 -->
    <el-row>
      <el-col :span="6">
        <el-form-item label="类型" prop="typeId">
          <el-select v-model="productFormData.typeId" placeholder="请选择...">
            <el-option v-for="pt in productTypes" :label="pt.typeName" :value="pt.id" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分级" prop="ageGrading">
          <el-select v-model="productFormData.ageGrading" placeholder="请选择分级">
            <el-option v-for="ag in ageGradingArray" :label="ag.title" :value="ag.val" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="价格" prop="price">
          <el-input-number v-model.number="productFormData.price" :min="0" controls-position="right"
            @change="handleChange" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="折扣" prop="discount">
          <el-input-number v-model.number="productFormData.discount" :min="0" :max="10" controls-position="right"
            @change="handleChange" />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-form-item label="介绍" prop="intro">
      <el-input v-model="productFormData.intro" :autosize="{ minRows: 4, maxRows: 10 }" type="textarea"
        placeholder="请填写商品描述" />
    </el-form-item>
    <!-- 第四行 -->
    <el-row>
      <el-col :span="8">
        <el-form-item label="开发商" prop="developers">
          <el-input v-model="productFormData.developers" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发行商" prop="publisher">
          <el-input v-model="productFormData.publisher" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发行时间" label-width="80" prop="releaseDate">
          <el-date-picker v-model="productFormData.releaseDate" type="date" placeholder="选择日期" />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 第五行 -->
    <el-row>
      <el-col :span="20"></el-col>
      <el-col :span="2">
        <el-button type="primary" @click="productFormSubmit(productForm)">保存</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="productFormReset(productForm)">清空</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { reactive, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getProductTypes } from "@/api/product";
import { ElMessage } from "element-plus";

export default {
  name: "ProductEdit",
  setup() {
    const store = useStore();

    // 自定义表单验证规则
    const checkStr = (rule, value, callback) => {
      return !(value.trim() == "");
    };

    // 绑定数据
    const data = reactive({
      productFormData: {
        name: null,
        typeId: null,
        price: 0,
        intro: null,
        ageGrading: null,
        developers: null,
        publisher: null,
        releaseDate: null,
        discount: 0,
        // 不参与表单编辑，仅保证更新和创建时携带数据
        id: null,
        image: ".png",
        browse: 0,
        purchases: 0,
        state: 0
      },
      productFormRules: {
        name: [
          { required: true, message: "请填写商品名称" },
          { validator: checkStr, message: "不能全为空格" },
        ],
        typeId: [{ required: true, message: "请选择商品类型" }],
        price: [
          { required: true, message: "请填写商品价格" },
          { type: "number", message: "商品价格只能是数字" },
        ],
        intro: [
          { required: true, message: "请填写商品介绍" },
          { validator: checkStr, message: "不能全为空格" },
        ],
        ageGrading: [{ required: true, message: "请选择商品分级" }],
        developers: [
          { required: true, message: "请填写开发商" },
          { validator: checkStr, message: "不能全为空格" },
        ],
        publisher: [
          { required: true, message: "请填写发行商" },
          { validator: checkStr, message: "不能全为空格" },
        ],
        releaseDate: [{ required: true, message: "请选择发行时间" }],
        discount: [
          { required: true, message: "请填写商品折扣" },
          { type: "number", message: "商品折扣只能是数字" },
        ],
      },
      productTypes: [],
      ageGradingArray: [
        { title: "全年龄", val: 0 },
        { title: "EC（三岁以上）", val: 3 },
        { title: "E（六岁以上）", val: 6 },
        { title: "E10+（十岁以上）", val: 10 },
        { title: "T（十三岁以上）", val: 13 },
        { title: "M（十七岁以上）", val: 17 },
        { title: "AO（十八岁以上）", val: 18 },
      ],
      other: {
        loading: false
      }
    });

    // DOM
    const doms = {
      productForm: ref(),
    };

    // 事件回调
    const eventCallbacks = {
      // 保存按钮点击事件
      productFormSubmit: (formRef) => {
        formRef.validate(async (valid) => {
          data.other.loading = true;
          if (valid) {
            let product = data.productFormData;
            let editType = product.id ? 'update' : 'create';
            // vuex的active包装的修改，修改完后会更新vuex中的数据，该数据会在其他页面用到，需要保持最新状态
            let requiredState = await store.dispatch("product/edit_product", { product, editType });
            if (requiredState)
              ElMessage.success("保存成功");
            else
              ElMessage.error("保存失败");
          }
          data.other.loading = false;
        });
      },
      productFormReset(formRef) {
        formRef.resetFields();
      },
    };

    onMounted(async () => {
      data.other.loading = true;
      // state：1 被启用的分类
      data.productTypes.push(...(await getProductTypes({ state: 1 })));
      // 获取vuex存储的product
      let product = store.state.product.productData;
      if (product) {
        Object.keys(data.productFormData).forEach(key => {
          data.productFormData[key] = product[key];
        });
      }
      data.other.loading = false;
    });

    return {
      ...data,
      ...doms,
      ...eventCallbacks,
    };
  },
};
</script>

<style scoped></style>
