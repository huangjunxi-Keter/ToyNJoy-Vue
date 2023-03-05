<template>
    <el-divider v-loading="other.isloading" content-position="left">封面</el-divider>
    <el-upload ref="productImage" list-type="picture-card" :action="`${getRequestAddress()}/api/product/updateImage`"
        method="post" :headers="getRequestHeader()" :name="upload.productId" :accept="upload.accept" :limit="1"
        :file-list="coverFileList" :on-exceed="handleExceed">
        <el-icon>
            <Plus />
        </el-icon>
        <template #file="{ file }">
            <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <el-icon><zoom-in /></el-icon>
                    </span>
                </span>
            </div>
        </template>
    </el-upload>
    <el-divider content-position="left">图集</el-divider>
    <el-upload ref="photoGallery" list-type="picture-card" :action="`${getRequestAddress()}/api/ProductPhotoGallery/add`"
        method="post" :headers="getRequestHeader()" :name="upload.productId" :accept="upload.accept"
        :file-list="photoGalleryFileList" :on-preview="handlePictureCardPreview" :on-success="handleSuccess"
        :on-remove="handleRemove">
        <el-icon>
            <Plus />
        </el-icon>
    </el-upload>
    <el-dialog v-model="dialog.dialogImageVisible" :modal="false" append-to-body align-center>
        <img class="image-plus" w-full :src="dialog.dialogImageUrl" />
    </el-dialog>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { genFileId } from 'element-plus';
import { getImageUrl, getRequestHeader, getRequestAddress } from '@/utils/request';
import { getPhotoGallery, delPhotoGallery } from '@/api/product';

export default {
    name: 'PhotoGallery',
    setup() {
        const store = useStore();

        const data = reactive({
            coverFileList: [],
            photoGalleryFileList: [],
            computeds: {
                product: computed(() => store.state.product.productData)
            },
            upload: {
                accept: '.jpg,.jpeg,.png',
                productId: store.state.product.productData.id.toString()
            },
            dialog: {
                dialogImageVisible: false,
                dialogImageUrl: ''
            },
            other: {
                isloading: false
            }
        });

        // DOM
        const doms = {
            productImage: ref()
        }

        // 事件回调
        const eventCallbacks = {
            handlePictureCardPreview(image) {
                data.dialog.dialogImageUrl = image.url;
                data.dialog.dialogImageVisible = true;
            },
            // upload 超出文件数量限制时触发
            handleExceed(files) {
                doms.productImage.value.clearFiles();
                const file = files[0];
                file.uid = genFileId();
                doms.productImage.value.handleStart(file);
                // 提交（上传图片）
                doms.productImage.value.submit();
            },
            handleSuccess(response, image, fileList) {
                fileList[fileList.length - 1].url = getImageUrl(`photoGallery/${response}`);
            },
            handleRemove(image, fileList) {
                let imageUrl = image.url;
                let imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.length);
                delPhotoGallery(data.upload.productId, imageName);
            }
        }

        onMounted(async () => {
            // 获取封面
            data.coverFileList.push({ url: getImageUrl(`products/${data.computeds.product.image}`) });
            // 获取图集
            for (let photoGallery of await getPhotoGallery(data.computeds.product.id)) {
                data.photoGalleryFileList.push({ url: getImageUrl(`photoGallery/${photoGallery.image}`) })
            }
        });

        return {
            ...data,
            ...doms,
            ...eventCallbacks,
            getRequestHeader,
            getRequestAddress
        }
    }
}
</script>

<style scoped>
.image-plus {
    width: 100%
}
</style>