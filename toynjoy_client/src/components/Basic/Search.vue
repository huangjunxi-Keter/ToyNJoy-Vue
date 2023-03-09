<template>
    <div class="sel">
        <input class="sel_box" type="text" v-model="searchStr" />
        <input class="sel_button" type="button" :style="{ 'background-image': `url('${getImage('system/sel_gray.png')}')` }"
            @click="search" />
    </div>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            searchStr: ''
        }
    },
    methods: {
        search() {
            this.$emit('handleSearch', this.searchStr);
        }
    }
}
</script>

<style scoped>
.sel {
    width: 600px;
    height: 40px;
    margin-left: auto;
    margin-right: 20px;
    border-radius: 5px;
    box-shadow: 0 0 2px 0.5px #aeaeae;
}

.sel>input {
    vertical-align: middle;
    border: none;
    outline: none;
    font-size: 15px;
    color: #808080;
    background-color: white;
    box-shadow: 0 0 2px 0.5px #aeaeae;
}

.sel_box {
    width: 85%;
    height: 100%;
    border-radius: 5px 0 0 5px;
    padding: 0 15px;
}

.sel_button {
    width: 15%;
    height: 100%;
    border-radius: 0 5px 5px 0;
    background-size: auto 120%;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
}
</style>