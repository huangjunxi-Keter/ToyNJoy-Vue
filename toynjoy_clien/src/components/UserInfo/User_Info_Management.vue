<template>
    <div id="update" data-toggle="modal" data-target="#myModal">
        编 辑 个 人 资 料
    </div>

    <!-- 模态框 -->
    <div class="modal fade" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- 模态框头部 -->
                <div class="modal-header">
                    <h4 class="modal-title">编辑个人资料</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- 模态框主体 -->
                <div class="modal-body">
                    <form id="update_box">
                        <table>
                            <tr>
                                <th>性别</th>
                                <td>
                                    <select :model="userInfo.gender" id="update_gender" class="form-control"
                                        name="update_gender">
                                        <option value="boy">男</option>
                                        <option value="girl">女</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>签名</th>
                                <td>
                                    <input :model="userInfo.signature" id="update_signature" type="text"
                                        class="form-control" name="update_signature" />
                                </td>
                            </tr>
                            <tr>
                                <th>邮箱</th>
                                <td>
                                    <input :model="userInfo.email" id="update_email" type="text" class="form-control"
                                        name="update_email" />
                                </td>
                            </tr>
                            <tr>
                                <th>生日</th>
                                <td>
                                    <input :model="userInfo.birthday" id="update_birthday" type="date"
                                        class="form-control" name="update_birthday" />
                                </td>
                            </tr>
                            <tr>
                                <th>身份证</th>
                                <td>
                                    <input :model="userInfo.idCard" id="update_idcard" type="text" class="form-control"
                                        name="update_idcard" />
                                </td>
                            </tr>
                            <tr>
                                <th>地址</th>
                                <td>
                                    <input :model="userInfo.address" id="update_address" type="text"
                                        class="form-control" name="update_address" />
                                </td>
                            </tr>
                            <tr>
                                <th>手机</th>
                                <td>
                                    <input :model="userInfo.phone" id="update_phone" type="text" class="form-control"
                                        name="update_phone" />
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>

                <!-- 模态框底部 -->
                <div class="modal-footer">
                    <button id="update_go" type="button" class="btn btn-primary">保存</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                </div>

            </div>
        </div>
    </div>

    
</template>

<script>
export default {
    name: 'User_Info_Management',
    props: ['userInfo']
}
</script>

<style>

</style>