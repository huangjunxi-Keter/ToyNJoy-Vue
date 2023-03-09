<template>
    <div class="basic_info"
        :style="{ 'background-image': `url('${getImage('user/wrapper/' + userInfo.wrapperImage)}')` }">
        <div class="virtual_image" data-toggle="modal" data-target="#virtual"
            :style="{ 'background-image': `url('${getImage('user/' + userData.virtualImage)}')` }">
        </div>

        <div class="info">
            <ul>
                <li>
                    <div class="nickName">{{ userData.nickname }}</div>
                    <div class="gender"
                        :style="{ 'background-image': `url('${getImage('system/' + userInfo.gender + '.png')}')` }">
                    </div>
                    <div class="lv">LV{{ userData.lv }}</div>
                </li>
                <li class="signature">{{ userInfo.signature }}</li>
            </ul>
        </div>

        <!-- 模态框 -->
        <div class="modal fade" id="virtual">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- 模态框头部 -->
                    <div class="modal-header">
                        <h4 class="modal-title">编辑头像</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- 模态框主体 -->
                    <div class="modal-body">
                        <div class="content"
                            :style="{ 'background-image': `url('${getImage('system/zxy_darkgray.png')}')` }">
                            <div>
                                <input ref="newVirtual" @change="setNewVirtual" type="file" accept="image/*" />
                            </div>
                            <div class="virtual_box old_virtual"
                                :style="{ 'background-image': `url('${getImage('user/' + userData.virtualImage)}')` }">
                            </div>
                            <div class="virtual_box new_virtual">
                                <img ref="newVirtualImage" />
                            </div>
                        </div>
                    </div>

                    <!-- 模态框底部 -->
                    <div class="modal-footer">
                        <button @click="updateVirtual" class="btn btn-primary">保存</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/modal'
import { mapState } from 'vuex'

export default {
    name: 'Base_Info',
    computed: {
        ...mapState('user', ['userData', 'userInfo']),
    },
    methods: {
        //#region 通过input的值渲染图片
        setNewVirtual(event) {
            //获取input file的files文件数组的元素;
            let file = event.target.files[0];
            //创建用来读取此文件的对象
            var reader = new FileReader();
            //使用该对象读取file文件
            reader.readAsDataURL(file);
            //读取文件成功后执行的方法函数
            reader.onload = (e) => {
                //读取成功后返回的一个参数e，整个的一个进度事件
                // console.log(e);
                //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
                //的base64编码格式的地址
                this.$refs.newVirtualImage.src = e.target.result;
            }
        },
        //#endregion

        //#region 更新头像
        updateVirtual() {
            if (this.$refs.newVirtual.value != '') {
                let formData = new FormData();
                formData.append('virtualImage', this.$refs.newVirtual.files[0]);
                // console.log(formData.get('virtualImage'));// FormData私有类对象，访问不到，可以通过get判断值是否传进去
                this.myAxios({
                    method: 'post',
                    url: 'User/updateVirtual',
                    data: formData,
                    success: (response) => {
                        if (response.data)
                            this.$router.go(0);
                    }
                });
            }
        }
        //#endregion
    }
}
</script>

<style scoped>
.basic_info {
    background-color: white;
    width: 85vw;
    min-width: 1200px;
    height: 12vw;
    min-height: 150px;
    margin: 0 auto;
    box-shadow: 0 0 1px 1px #e5e5e5;
    border-radius: 0 0 10px 10px;
    background-size: 100%;
    background-position: center;
}

.virtual_image {
    float: left;
    width: 8vw;
    height: 8vw;
    margin: 1.8vw 2vw;
    border-radius: 5vw;
    border: 0.2vw solid rgba(200, 200, 200, 0.5);
    background-size: auto 100%;
    background-position: center;
    cursor: pointer;
}

.info {
    float: left;
    height: 7vw;
    width: 80%;
    margin: 2vw auto;
    padding-right: 2vw;
}

.info>ul {
    list-style: none;
    height: 100%;
    position: relative;
}

.info>ul>li:first-child {
    height: 3vw;
    line-height: 3vw;
}

.info li:first-child>* {
    float: left;
}

.info li:last-child {
    position: absolute;
    bottom: 0;
    color: #d6dee4;
    font-size: 1vw;
}

.gender,
.lv {
    height: 1.5vw;
    line-height: 1.5vw;
    margin: 0.85vw 0 0 1vw;
    text-align: center;
}

.gender {
    width: 1.5vw;
    border-radius: 0.75vw;
    background-size: 100%;
}

.lv {
    width: 2.5vw;
    border-radius: 0.25vw;
    background-color: dodgerblue;
    font-size: 0.8vw;
    font-weight: bold;
    color: white;
    user-select: none;
}

.nickName {
    color: white;
    font-size: 2vw;
    font-weight: bold;
    padding: 0 1vw;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 1);
}

.signature {
    padding: 0.5vw;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.65);
}

#virtual {
    margin-top: 10vw;
}

#virtual * {
    outline: none;
}

#virtual .content {
    height: 200px;
    background-repeat: no-repeat;
    background-position: center 70%;
    background-size: 100px;
}

.virtual_box {
    width: 150px;
    height: 150px;
    margin-top: 20px;
    border: 2px solid #959595;
    border-radius: 75px;
}

.old_virtual {
    float: left;
    margin-left: 30px;
    background-size: auto 100%;
    background-position: center;
}

.new_virtual {
    float: right;
    margin-right: 30px;
    overflow: hidden;
    text-align: center;
}

.new_virtual>img {
    height: 100%;
    margin: 0 -100%;
}
</style>