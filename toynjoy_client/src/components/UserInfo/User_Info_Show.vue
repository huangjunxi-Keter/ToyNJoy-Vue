<template>
    <div class="userInfoShow">
        <div class="title">用户详情</div>
        <div class="content">
            <div class="item">
                <span class="title-min">生日：</span>
                <span class="text">{{ userInfo.birthday }}</span>
            </div>
            <div class="item">
                <span class="title-min">手机：</span>
                <span class="text">{{ userInfo.phone }}</span>
            </div>
            <div class="item">
                <span class="title-min">邮箱：</span>
                <span class="text">{{ userData.email }}</span>
            </div>
            <div class="item">
                <span class="title-min">地区：</span>
                <span class="text">{{ userInfo.address }}</span>
            </div>
            <div class="item">
                <span class="open-order-modal" data-toggle="modal" data-target="#staticBackdrop">我的订单&nbsp;&#8594;</span>
            </div>
            <!-- 订单 Modal -->
            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <!-- 提示信息 -->
                <div v-show="showError" class="alert alert-danger alert-dismissible fade show">
                    <strong>错误!</strong> 失败的操作。
                </div>
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <!-- 模态框头部 -->
                        <div class="modal-header">
                            <div class="input-group mt-3 mb-3">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle"
                                        data-toggle="dropdown">
                                        {{ selectTitle }}
                                    </button>
                                    <div class="dropdown-menu">
                                        <span class="dropdown-item" @click="changeSearchState(null)">全部</span>
                                        <span class="dropdown-item" @click="changeSearchState(0)">未支付</span>
                                        <span class="dropdown-item" @click="changeSearchState(1)">已支付</span>
                                        <span class="dropdown-item" @click="changeSearchState(2)">已关闭</span>
                                    </div>
                                </div>
                                <input type="text" class="form-control" placeholder="按订单号搜索" v-model="searchOrderId" />
                            </div>
                            <!-- 关闭按钮 -->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- 表格 -->
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>订单号</th>
                                        <th>总价</th>
                                        <th>时间</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="order in orders">
                                        <td>{{ order.id }}</td>
                                        <td>￥{{ order.totalAmount }}.00</td>
                                        <td>{{ order.createDate | timeformater }}</td>
                                        <td>{{ getStateStr(order.state) }}</td>
                                        <td>
                                            <template v-if="order.state === 0">
                                                <button class="btn btn-primary btn-sm" @click="toAlipay(order)">支付</button>
                                                &nbsp;
                                                <button class="btn btn-danger btn-sm" @click="changeOrderState(order, 2)">
                                                    取消
                                                </button>
                                            </template>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination :page="page" @updateData="searchOrder" />
                            <!-- 支付表单插入 -->
                            <div id="settle_accounts"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!---->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Pagination from '@/components/Basic/Pagination.vue';

export default {
    name: 'User_Info_Show',
    components: {
        'pagination': Pagination
    },
    data() {
        return {
            orders: [],
            selectTitle: '全部',
            showError: false,
            searchOrderId: null,
            searchState: null,
            searchTime: null,
            page: {
                dataTotal: 0,
                pageItem: 5,
                pageTotal: 0,
                nowPage: 1,
                previous: 0,
                next: 2
            }
        }
    },
    computed: {
        ...mapState('user', ['userData', 'userInfo'])
    },
    watch: {
        searchOrderId() {
            if (this.searchTime)
                clearTimeout(this.searchTime);
            this.searchTime = setTimeout(() => {
                this.searchOrder();
            }, 300);
        }
    },
    methods: {
        //#region 获取订单（含分页）
        searchOrder(nowPage) {

            // 查询条件
            let params = {
                username: this.userData.username,
                orderId: this.searchOrderId,
                state: this.searchState
            };

            // 查询总条数
            this.myAxios({
                url: '/Order/findCount',
                params,
                success: (response) => {
                    this.page.dataTotal = response.data;
                    this.page.pageTotal = Math.ceil(this.page.dataTotal / this.page.pageItem);

                    if (nowPage)
                        this.page.nowPage = nowPage;
                    // 追加分页条件
                    params.page = this.page.nowPage - 1;
                    params.count = this.page.pageItem;

                    // 查询订单
                    this.myAxios({
                        url: '/Order/find',
                        params,
                        success: (response) => {
                            this.orders = response.data;
                        }
                    });
                }
            });
        },
        //#endregion

        //#region 状态字符串
        getStateStr(state) {
            let result = '';
            switch (state) {
                case null:
                    result = "全部";
                    break;
                case 0:
                    result = "未支付";
                    break;
                case 1:
                    result = "已支付";
                    break;
                case 2:
                    result = "已关闭";
                    break;
            }
            return result;
        },
        //#endregion

        //#region 跳转到支付页面
        toAlipay(order) {
            if (order.alipayForm) {
                //（！！！AdGuard 广告拦截器 会影响沙箱支付宝 使其支付后出现【系统有点忙】错误！！！）
                const div = document.createElement('div');
                div.innerHTML = order.alipayForm;
                document.getElementById('settle_accounts').appendChild(div);
                document.getElementById('alipaysubmit').submit();
            } else {
                this.showError = true;
            }
        },
        //#endregion

        //#region 改变订单状态
        changeOrderState(order, state) {
            let data = this.cloneObj(order);
            data.state = state;
            this.myAxios({
                method: 'post',
                url: '/Order/upd',
                data,
                success: (response) => {
                    if (response.data)
                        this.$router.go(0);
                }
            });
        },
        //#endregion

        //#region 状态下拉菜单按钮点击事件
        changeSearchState(state) {
            this.selectTitle = this.getStateStr(state);
            this.searchState = state;
            this.searchOrder();
        }
        //#endregion
    },
    mounted() {
        this.searchOrder();
    }
}
</script>

<style scoped>
.userInfoShow {
    width: 20vw;
    min-width: 240px;
    height: 29vw;
    min-height: calc(500px - 1vw);
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 0.25vw 0.15vw #dadada;
    overflow: hidden;
}

.title {
    font-size: 20px;
    font-weight: 600;
    width: 100%;
    padding: 15px 25px;
}

.content {
    padding: 0 40px;
}

.item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-bottom: 15px;
    color: #888;
}

.item:last-child {
    padding-bottom: 0;
}

.title-min {
    color: #333;
}

.open-order-modal {
    color: dodgerblue;
    user-select: none;
    cursor: pointer;
}

.open-order-modal:hover {
    color: rgb(0, 100, 201);
}

.table thead th {
    border-top: none;
}

.dropdown-item {
    user-select: none;
    cursor: pointer;
}
</style>