<template>
    <el-form v-loading="other.isloading" :model="newsFormData" ref="newsForm" :rules="newsFormRules" label-width="55px" :inline="false">
        <el-form-item label="标题" prop="title">
            <el-input v-model="newsFormData.title" />
        </el-form-item>
        <el-form-item label="封面" prop="image">
            <el-upload ref="imageUpload" list-type="picture-card" :auto-upload="false" :name="upload.name"
                :accept="upload.accept" :limit="1" method="post" :action="`${getRequestAddress()}/api/News/uploadImage`"
                :headers="getRequestHeader()" :file-list="upload.imageFileList" :on-exceed="handleExceed"
                :on-success="handleSuccess">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="text">
            <div class="wangeditor-box">
                <Toolbar class="wangeditor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" />
                <Editor class="wangeditor-editor" v-model="newsFormData.text" :defaultConfig="editorConfig"
                    @onCreated="handleCreated" />
            </div>
        </el-form-item>
        <!-- el-form-item 的 z-index 始终高于上一个 el-form-item，会导致 editor 全屏时依然显示按钮-->
        <div class="padding-left-equal-form-label-width">
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
    </el-form>
</template>

<script>
import { reactive, ref, shallowRef, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { genFileId, ElMessage } from 'element-plus';
import { getImageUrl, getRequestAddress, getRequestHeader } from '@/utils/request';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { updateNews, createNews } from "@/api/news";
import { deleteFile } from "@/api/system";

export default {
    name: 'NewsEdit',
    components: { Editor, Toolbar },
    setup() {
        const store = useStore();

        const data = reactive({
            newsFormData: {
                id: null,
                typeId: null,
                title: null,
                text: null,
                pageView: 0,
                commend: 0,
                trample: 0,
                updateTime: null,
                image: null,
                productId: null
            },
            newsFormRules: {
                title: [{ required: true, message: "请填写标题" }],
                image: [{ required: true, message: "请选择封面" }],
                text: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            // wangeditor 默认带 <p><br></p> 内容
                            return !(value === "<p><br></p>");
                        },
                        message: "请编写内容"
                    }
                ]
            },
            upload: {
                imageFileList: [{ url: getImageUrl("/system/.png") }],
                name: '',
                accept: '.jpg,.jpeg,.png'
            },
            toolbarConfig: {},
            editorConfig: {
                placeholder: '请输入内容...',
                MENU_CONF: {
                    // uploadImage: {
                    //     server: '/api/upload',
                    // }
                }
            },
            other: {
                isloading: false
            }
        });

        const doms = {
            newsForm: ref(),
            imageUpload: ref(),
            editorRef: shallowRef()
        }

        const eventCallBacks = {
            handleExceed: (files) => {
                doms.imageUpload.value.clearFiles();
                const file = files[0];
                console.log(file);
                file.uid = genFileId();
                doms.imageUpload.value.handleStart(file);
                // 通过uid生成file.name(uid来自file，是唯一的)
                let fileType = file.name.substring(file.name.lastIndexOf('.'), file.name.length);
                data.newsFormData.image = file.uid + fileType;
                data.upload.name = file.uid + fileType;
            },
            handleCreated: (editor) => {
                doms.editorRef.value = editor // 记录 editor 实例，重要！
                if (data.newsFormData.text) {
                    doms.editorRef.value.setHtml(data.newsFormData.text);
                }
            },
            onSubmit() {
                doms.newsForm.value.validate(async (valid) => {
                    if (valid) {
                        let isUpdate = !!data.newsFormData.id;
                        let response = isUpdate ? await updateNews(data.newsFormData) : await createNews(data.newsFormData);
                        if (!!response) {
                            doms.imageUpload.value.submit();
                            if (!isUpdate) {
                                data.newsFormData.id = response.id;
                            }
                            ElMessage.success("保存成功");
                        }
                        else
                            ElMessage.error("保存失败");
                    }
                });
            },
            handleSuccess(response) {
                if (response) {
                    let oldNews = store.state.news.editNews;
                    if (oldNews && oldNews.image && data.newsFormData.image != oldNews.image) {
                        deleteFile("/Image/news/cover", oldNews.image);
                    }
                } else {
                    ElMessage.error("封面上传失败");
                }
            }
        }

        onMounted(async () => {
            data.other.isloading = true;
            let editNews = store.state.news.editNews;
            if (editNews) {
                Object.keys(data.newsFormData).forEach(key => {
                    data.newsFormData[key] = editNews[key];
                });
                data.upload.imageFileList[0].url = getImageUrl(`/news/cover/${data.newsFormData.image}`);
            }
            data.other.isloading = false;
        });

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = doms.editorRef.value
            if (editor == null) return
            editor.destroy()
        });

        return {
            ...data,
            ...doms,
            ...eventCallBacks,
            getRequestAddress,
            getRequestHeader
        }
    }
}
</script>

<style scoped>
.wangeditor-box {
    border: 1px solid #ccc;
}

.wangeditor-toolbar {
    border-bottom: 1px solid #ccc;
}

.wangeditor-editor {
    /* 
        Editor 组件默认会带有内联样式 width：100%
        会导致 class 的 width 无效
    */
    min-height: 300px;
    overflow-y: hidden;
}

.padding-left-equal-form-label-width {
    padding-left: 55px;
}
</style>