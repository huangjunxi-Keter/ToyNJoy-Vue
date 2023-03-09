<template>
    <!-- 不要改id，支付表单要通过id插入 -->
    <div id="settle_accounts">
        <div class="total_price">
            <span>
                预计总额
                <span>{{ this.ShoppingCart.length }}</span>
            </span>
            ￥{{ totalAmount }}
        </div>
        <div class="operation">
            <p>为自己购买还是作为礼物购买？请选一项以继续付款。</p>
            <div>
                <button @click="createOrder()">立即购买</button>
                <!-- <button id="ForFriend">作为礼物购买</button> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Settle_Accounts',
    computed: {
        totalAmount() {
            let result = 0;
            this.ShoppingCart.forEach(element => {
                result += element.product[this.priceField];
            });

            return result;
        }
    },
    methods: {
        createOrder() {
            this.myAxios({
                method: 'post',
                url: 'Order/add',
                success: (response) => {
                    //（！！！AdGuard 广告拦截器 会影响沙箱支付宝 使其支付后出现【系统有点忙】错误！！！）
                    if (response.data.indexOf("form") > -1) {
                        const div = document.createElement('div');
                        div.innerHTML = response.data;
                        document.getElementById('settle_accounts').appendChild(div);
                        document.getElementById('alipaysubmit').submit();
                    } else if (this.totalAmount === 0) {
                        this.go("payCallback", {
                            app_id: "2016101700709747",
                            out_trade_no: response.data.replace("oid", "")
                        });
                    }
                }
            });
        }
    },
    props: ['ShoppingCart', 'priceField']
}
</script>

<style scoped>
#settle_accounts {
    width: 100%;
    padding: 0 10px;
    margin: 0 auto;
    color: #656565;
    border-radius: 5px;
    box-shadow: 0 0 4px 0.5px #aeaeae;
    background-color: white;
}

.total_price {
    padding: 1.5vw 0.5vw 1vw 0;
    font-weight: bold;
    text-align: right;
    border-bottom: solid #aeaeae 2px;
}

.total_price>span {
    position: relative;
    font-size: 20px;
    margin-right: 30px;
}

.total_price>span>span {
    font-size: 12px;
    position: absolute;
    top: 0;
}

.operation {
    padding: 20px 10px;
}

.operation>p {
    font-size: 15px;
}

.operation>div {
    text-align: right;
}

.operation>div>button {
    border: none;
    height: 40px;
    padding: 0 15px;
    border-radius: 0.2vw;
    outline: none;
    background-color: rgba(121, 153, 5, 1);
    color: #d2e885 !important;
    cursor: pointer;
}

/* .operation>div>button:nth-child(1) {
    margin-right: 15px;
} */
</style>