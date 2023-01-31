<template>
    <div>
        <div id="UserInfoButton" data-toggle="modal" data-target="#UserInfo">
            编 辑 个 人 资 料
        </div>

        <!-- 模态框 -->
        <div class="modal fade" id="UserInfo">
            <!-- 提示 -->
            <div v-for="msg in message.contents"
                :class='{ "alert": true, "alert-success": message.state, "alert-danger": !message.state }' role="alert">
                {{ msg }}
            </div>
            <!---->
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- 模态框头部 -->
                    <div class="modal-header">
                        <h4 class="modal-title">编辑个人资料</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- 模态框主体 -->
                    <div class="modal-body">
                        <table>
                            <tr>
                                <th>昵称</th>
                                <td>
                                    <input v-model="userData.nickname" type="text" class="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <th>邮箱</th>
                                <td>
                                    <input v-model="userData.email" type="email" class="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <th>签名</th>
                                <td>
                                    <input v-model="userInfo.signature" type="text" class="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <th>性别</th>
                                <td>
                                    <select v-model="userInfo.gender" class="form-control">
                                        <option value="boy">男</option>
                                        <option value="girl">女</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>生日</th>
                                <td>
                                    <input v-model="userInfo.birthday" type="date" class="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <th>身份证</th>
                                <td>
                                    <input v-model="userInfo.idcard" type="text" class="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <th>地址</th>
                                <td>
                                    <input v-model="userInfo.address" type="text" class="form-control"
                                        name="update_address" />
                                </td>
                            </tr>
                            <tr>
                                <th>手机</th>
                                <td>
                                    <input v-model="userInfo.phone" type="text" class="form-control" />
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- 模态框底部 -->
                    <div class="modal-footer">
                        <button @click="submit" type="button" class="btn btn-primary">保存</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/alert'
import { mapState } from 'vuex'
import axios from 'axios';

export default {
    name: 'User_Info_Management',
    data() {
        return {
            message: {
                state: false,
                contents: []
            }
        }
    },
    computed: {
        ...mapState('user', ['userData', 'userInfo']),
    },
    methods: {
        //#region 提交修改
        submit() {
            this.message.contents = [];
            //#region 验证信息
            if (this.userData.email.trim() != '' && !this.isEmail(this.userData.email))
                this.message.contents.push('邮箱错误！');

            if (this.userInfo.idcard != null && this.userInfo.idcard != '' && !this.isIdCard(this.userInfo.idcard))
                this.message.contents.push('身份证错误！');

            if (this.userInfo.phone != null && this.userInfo.phone != '' && !this.isPhoneNumber(this.userInfo.phone))
                this.message.contents.push('手机号错误！');
            //#endregion

            if (this.message.contents.length <= 0) {
                axios({
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
                    },
                    method: 'post',
                    url: `${this.requestAddress}User/upd`,
                    data: this.userData,
                }).then((response) => {
                    let result = response;
                    // 如果用户信息更新成功，再更新用户详情
                    if (response.data) {
                        result = axios({
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('LoginUserToken')}`
                            },
                            method: 'post',
                            url: `${this.requestAddress}User/updInfo`,
                            data: this.userInfo,
                        });
                    }
                    return result;
                }).then((response) => {
                    if (response.data) {
                        this.message.state = true;
                        this.message.contents.push('更新成功！');

                        setTimeout(() => {
                            this.$router.go(0);
                        }, 500);
                    }
                });
            }
        }
        //#endregion
    }
}
</script>

<style scoped>
.alert {
    width: 500px;
    margin: 0 auto;
    transition: 1s;
}

/*------------*/
#UserInfoButton {
    width: 20vw;
    min-width: 240px;
    height: 5vw;
    min-height: 50px;
    border-radius: 10px;
    line-height: 5vw;
    text-align: center;
    font-size: 30px;
    color: white;
    background-color: dodgerblue;
    margin-bottom: 1vw;
    user-select: none;
    cursor: pointer;
    box-shadow: inset 0 0 0.5vw 0.025vw white;
}

#UserInfo {
    margin-top: 2.5vw;
}

#UserInfo h4 {
    text-align: center;
}

#UserInfo button {
    outline: none;
    user-select: none;
}

#UserInfo table {
    width: 90%;
    margin: 0 auto;
}

#UserInfo table td * {
    margin: 0.5vw auto;
}
</style>