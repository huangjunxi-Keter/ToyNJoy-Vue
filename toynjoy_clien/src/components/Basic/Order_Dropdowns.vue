<template>
    <div class="dropdown" style="display:inline-block">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            根据 {{ orderName }} 排序
        </button>
        <div class="dropdown-menu">
            <a v-for="order in orderTypes" @click.prevent="updateOrder(order)" class="dropdown-item">{{
                order.name
            }}</a>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/dropdown'

export default {
    name: 'Order_Dropdowns',
    data() {
        return {
            orderName: '默认'
        }
    },
    methods: {
        updateOrder(order) {
            this.orderName = order.name;
            this.$emit('updateOrder', { orderby: order.val });
        }
    },
    mounted() {
        if (this.orderTypes == undefined)
            console.error("【Order_Dropdowns 组件错误】请传入元素为 {name:'',val:''} 的数组 orderTypes (val 为排序的属性名)");
        else
            this.orderTypes.unshift({ name: '默认', val: '' });
    },
    props: ['orderTypes']
}
</script>

<style scoped>
.dropdown-item {
    user-select: none;
    cursor: pointer;
}
</style>