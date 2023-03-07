<!--
    【包裹此组件的容器最好相对定位】
    --- 或者自己写样式：props -> clienStyle
-->
<template>
    <div class="accordion" id="filterSidebar">
        <!-- 自己加的输入组件，和 bootstarp 原生 collapse 组件没有关系 -->
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">🔍</span>
            </div>
            <input v-model="query.name" type="text" class="form-control" placeholder="关键字"
                aria-describedby="basic-addon1">
        </div>
        <!---->

        <!-- 价格 -->
        <div class="card" v-if="showTypeConfig.price">
            <div class="card-header" id="price">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                        data-target="#priceBody" aria-expanded="false" aria-controls="priceBody">
                        价格
                    </button>
                </h2>
            </div>

            <div id="priceBody" class="collapse show" aria-labelledby="price" data-parent="#filterSidebar">
                <div v-for="price in prices" @click="setQueryPrice($event, price)"
                    :class="{ 'card-body': true, 'active': priceActive(price) }">
                    {{ price.text }}
                </div>
            </div>
        </div>
        <!---->

        <!-- 产品类型 -->
        <div class="card" v-if="showTypeConfig.productType">
            <div class="card-header" id="productType">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse"
                        data-target="#productTypeBody" aria-expanded="false" aria-controls="productTypeBody">
                        游戏类型
                    </button>
                </h2>
            </div>
            <div id="productTypeBody" class="collapse" aria-labelledby="productType" data-parent="#filterSidebar">
                <div v-for="ptype in productTypes" @click="setQueryType($event, ptype.id)"
                    :class="{ 'card-body': true, 'active': (query.typeId === ptype.id) }">
                    {{ ptype.typeName }}
                </div>
            </div>
        </div>
        <!---->
    </div>
</template>

<script>
import 'bootstrap/js/dist/collapse'

export default {
    name: 'Filter_Sidebar',
    data() {
        return {
            //#region 默认显示项配置
            showTypeConfig: {
                orderBy: true,
                price: true,
                productType: true
            },
            //#endregion

            //#region 价格筛选项
            prices: [
                { text: '免费', isMax: true, value: '0' },
                { text: '￥70.00以下', isMax: true, value: '70' },
                { text: '￥140.00以下', isMax: true, value: '140' },
                { text: '￥210.00以下', isMax: true, value: '210' },
                { text: '￥90.00及以上', isMax: false, value: '90' },
            ],
            //#endregion

            // 商品类型数据容器（从服务器获取）
            productTypes: [],

            //#region 查询条件
            query: {
                name: null,
                minPrice: null,
                maxPrice: null,
                typeId: null
            }
            //#endregion
        }
    },
    watch: {
        'query.name'() {
            this.updatData();
        }
    },
    methods: {
        //#region 判断价格筛选项是否被选中
        priceActive(price) {
            let result = false;
            if (price.isMax)
                result = (this.query.maxPrice == price.value);
            else
                result = (this.query.minPrice == price.value);

            return result;
        },
        //#endregion

        //#region 价格筛选点击事件
        setQueryPrice(event, price) {
            this.query.maxPrice = null;
            this.query.minPrice = null;

            if (event.target.className.indexOf('active') <= -1) {
                if (price.isMax)
                    this.query.maxPrice = price.value;
                else
                    this.query.minPrice = price.value;
            }

            this.updatData();
        },
        //#endregion

        //#region 类型筛选点击事件
        setQueryType(event, typeId) {
            this.query.typeId = null;

            if (event.target.className.indexOf('active') <= -1)
                this.query.typeId = typeId

            this.updatData();
        },
        //#endregion

        //#region 调用父组件提供的数据更新函数
        updatData() {
            this.$emit('updateData', 1, this.query);
        },
        //#endregion
    },
    mounted() {
        //#region 合并组件的默认配置和【props传递】的新配置
        this.showTypeConfig = { ...this.showTypeConfig, ...this.showType };
        //#endregion

        //#region 根据显示配置判断是否获取【商品类型数据】
        if (this.showTypeConfig.productType) {
            this.myAxios({
                url: 'ProductType/find',
                success: (response) => {
                    this.productTypes = response.data;
                }
            });
        }
        //#endregion
    },
    props: ['showType']
}
</script>

<style scoped>
.accordion {
    width: 20vw;
    min-width: 200px;
}

.card-body {
    user-select: none;
    cursor: pointer;
    color: gray;
}

.card-body.active {
    color: black;
}

.card-body:hover {
    color: black;
}

.btn-link {
    color: gray;
}

.btn-link:hover {
    color: black;
    text-decoration: none;
}

.input-group {
    margin-bottom: 10px;
}
</style>