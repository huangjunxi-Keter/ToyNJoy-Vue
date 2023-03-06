<template>
  <el-tabs type="border-card">
    <el-tab-pane label="基本信息">
      <ProductEdit />
    </el-tab-pane>
    <el-tab-pane label="配置信息">
      <HardwareRequirement />
    </el-tab-pane>
    <el-tab-pane label="商品图集">
      <PhotoGallery />
    </el-tab-pane>
    <el-tab-pane label="文件上传">
      <el-upload ref="uploadFile" drag multiple :limit="1" accept=".exe" :file-list="fileList"
        :action="`${getRequestAddress()}/api/product/updateFile`" method="post" :name="productData.id"
        :headers="getRequestHeader()" :on-exceed="onExceed" :before-upload="beforeUpload" :on-success="onSuccess">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          将文件拖到此处或&nbsp;<em>单击选择文件</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            请上传.exe文件
          </div>
        </template>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox, genFileId } from "element-plus";
import { getRequestAddress, getRequestHeader } from "@/utils/request";
import ProductEdit from "./ProductEdit.vue";
import HardwareRequirement from "./HardwareRequirement.vue";
import PhotoGallery from "./PhotoGallery.vue";

export default {
  name: "ProductInfo",
  components: {
    ProductEdit,
    HardwareRequirement,
    PhotoGallery
  },
  setup() {
    const store = useStore();

    const data = reactive({
      fileList: [],
      productData: {},
      upload: {
        fileName: ''
      }
    });

    const doms = {
      uploadFile: ref()
    }

    const eventCallBacks = {
      onExceed(files) {
        ElMessageBox.confirm(
          `该操作会移除旧的文件，请确保已自行备份必要文件`,
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            const file = files[0];
            file.uid = genFileId();
            doms.uploadFile.value.clearFiles();
            doms.uploadFile.value.handleStart(file);
            doms.uploadFile.value.submit();
          });
      },
      beforeUpload(file) {
        let result = true;
        if (file.type.indexOf("application/") < 0) {
          result = false;
          ElMessage.error("文件类型不正确");
        } else if (file.size / 1024 / 1024 > 15) {
          result = false;
          ElMessage.error("文件不能大于15MB");
        }
        return result;
      },
      onSuccess(response, uploadFile, uploadFiles) {
        if (!!response) {
          data.productData.fileName = response;
          ElMessage.success("上传成功");
        }
        else
          ElMessage.error("上传失败");
      }
    }

    onMounted(() => {
      let productForVuex = store.state.product.productData
      Object.keys(productForVuex).forEach(key => {
        data.productData[key] = productForVuex[key];
      });
      if (!!data.productData.fileName)
        data.fileList.push({ name: data.productData.fileName });
    });

    return {
      ...data,
      ...doms,
      ...eventCallBacks,
      getRequestAddress,
      getRequestHeader
    }
  }
};
</script>

<style scoped></style>
