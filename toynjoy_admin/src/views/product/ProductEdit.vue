<template>
  <el-form
    ref="productForm"
    label-width="70"
    :model="productFormData"
    :rules="productFormRules"
  >
    <!-- 第一行 -->
    <el-form-item label="名称" prop="Name">
      <el-input v-model="productFormData.Name" />
    </el-form-item>
    <!-- 第二行 -->
    <el-row>
      <el-col :span="6">
        <el-form-item label="类型" prop="TypeId">
          <el-select v-model="productFormData.TypeId" placeholder="请选择...">
            <el-option
              v-for="pt in productTypes"
              :label="pt.typeName"
              :value="pt.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分级" prop="AgeGrading">
          <el-select
            v-model="productFormData.AgeGrading"
            placeholder="请选择分级"
          >
            <el-option
              v-for="ag in ageGradingArray"
              :label="ag.title"
              :value="ag.val"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="价格" prop="Price">
          <el-input-number
            v-model.number="productFormData.Price"
            :min="0"
            controls-position="right"
            @change="handleChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="折扣" prop="Discount">
          <el-input-number
            v-model.number="productFormData.Discount"
            :min="0"
            :max="10"
            controls-position="right"
            @change="handleChange"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-form-item label="介绍" prop="Intro">
      <el-input
        v-model="productFormData.Intro"
        :autosize="{ minRows: 4 }"
        type="textarea"
        placeholder="请填写商品描述"
      />
    </el-form-item>
    <!-- 第四行 -->
    <el-row>
      <el-col :span="8">
        <el-form-item label="开发商" prop="Developers">
          <el-input v-model="productFormData.Developers" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发行商" prop="Publisher">
          <el-input v-model="productFormData.Publisher" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发行时间" label-width="80" prop="ReleaseDate">
          <el-date-picker
            v-model="productFormData.ReleaseDate"
            type="date"
            placeholder="选择日期"
            :size="size"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 第五行 -->
    <el-form-item label="封面">
      <el-upload
        ref="imageUpload"
        list-type="picture-card"
        :limit="1"
        :auto-upload="false"
        :accept="imageUploadAbout.imageUploadAccept"
        :name="imageUploadAbout.imageUploadName"
        :before-upload="imageBeforeUpload"
        :on-success="imageOnSuccess"
        :on-error="imageOnError"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <!-- 第六行 -->
    <el-row>
      <el-col :span="20"></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="productFormSubmit(productForm)">
          保存
        </el-button>
        <el-button>清空</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { reactive, ref, onMounted, watch } from "vue";
import { getProductTypes } from "@/api/product";
import { ElNotification } from "element-plus";

export default {
  name: "ProductEdit",
  setup() {
    // 自定义表单验证规则
    const checkStr = (rule, value, callback) => {
      return !(value.trim() == "");
    };
    // 绑定数据
    const data = reactive({
      productFormData: {
        Name: null,
        Image: null,
        TypeId: null,
        Price: 0,
        Intro: null,
        AgeGrading: null,
        Developers: null,
        Publisher: null,
        ReleaseDate: null,
        Discount: 0,
      },
      productFormRules: {
        Name: [
          { required: true, message: "请填写商品名称" },
          { validator: checkStr, message: "不能全为空格" },
        ],
        TypeId: [{ required: true, message: "请选择商品类型" }],
        Price: [
          { required: true, message: "请填写商品价格" },
          { type: "number", message: "商品价格只能是数字" },
        ],
        Intro: [
          { required: true, message: "请填写商品介绍" },
          { validator: checkStr, message: "不能全为空格" },
        ],
        AgeGrading: [{ required: true, message: "请选择商品分级" }],
        Developers: [
          { required: true, message: "请填写开发商" },
          { validator: checkStr, message: "不能全为空格" },
        ],
        Publisher: [
          { required: true, message: "请填写发行商" },
          { validator: checkStr, message: "不能全为空格" },
        ],
        ReleaseDate: [{ required: true, message: "请选择发行时间" }],
        Discount: [
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
      imageUploadAbout: {
        imageUploadAccept: ".jpg,.png,.jpeg",
        imageUploadName: "",
      },
    });

    // DOM
    const doms = {
      productForm: ref(),
      imageUpload: ref(null),
    };

    // 事件回调
    const eventCallbacks = {
      // 文件上传前的回调，返回false阻止上传
      imageBeforeUpload: (file) => {
        let result = false;
        let fileName = file.name;
        // 截取文件后缀
        let fileType = fileName.substring(
          fileName.lastIndexOf("."),
          fileName.length
        );
        // 通过设定的文件后缀判断文件格式是否正确
        let isImage = !!data.imageUploadAbout.imageUploadAccept
          .split(",")
          .find((item) => item === fileType);
        //-----------------------------------
        if (isImage) {
          result = true;
        } else {
          ElNotification({
            title: "图片上传失败",
            message: "所选文件不是图片类型，请重新选择",
            type: "error",
          });
        }
        return result;
      },
      // 保存按钮点击事件
      productFormSubmit: (formRef) => {
        // 先做验证并上传图片，表单提交放到图片上传的回调里
        formRef.validate((valid) => {
          if (valid) {
          }
          doms.imageUpload.value.submit();
        });
      },
      // 图片上传成功的回调
      imageOnSuccess: (...val) => {
        console.log("success", val);
      },
      // 文件上传失败的回调
      imageOnError: (...val) => {
        console.log("error", val);
      },
    };

    onMounted(async () => {
      data.productTypes.push(...(await getProductTypes()));
    });

    watch(
      () => data.productFormData.Name,
      (newVla, oldVal) => {
        data.imageUploadAbout.imageUploadName = newVla.replace(/\s+/g, "_");
      }
    );

    return {
      ...data,
      ...doms,
      ...eventCallbacks,
    };
  },
};
</script>

<style scoped></style>
