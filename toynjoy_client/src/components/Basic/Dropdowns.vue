<template>
    <div class="dropdown" style="display:inline-block">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            {{ (title || "") + checkedName }}
        </button>
        <div class="dropdown-menu">
            <a v-for="data in dropdownsData" @click.prevent="onChange(data)" class="dropdown-item">{{
                data.name
            }}</a>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/dropdown'

export default {
    name: 'Dropdowns',
    data() {
        return {
            checkedName: ''
        }
    },
    methods: {
        onChange(data) {
            this.checkedName = data.name;
            this.$emit('handleChange', data.val);
        }
    },
    watch: {
        dropdownsData() {
            if (this.dropdownsData.length > 0)
                this.checkedName = this.dropdownsData[0].name
        }
    },
    mounted() {
        if (this.dropdownsData == undefined)
            console.error("【Dropdowns 组件错误】请传入元素为 {name:'',val:''} 的数组 orderTypes (val 为排序的属性名)");
        else if (this.dropdownsData.length > 0)
            this.checkedName = this.dropdownsData[0].name
    },
    props: ['dropdownsData', 'title']
}
</script>

<style scoped>
.dropdown-item {
    user-select: none;
    cursor: pointer;
}
</style>