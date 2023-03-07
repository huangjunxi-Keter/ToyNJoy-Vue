<template>
    <div class="news" @click="go('newsContent', { id: news.id })">
        <label>{{ index + 1 }}</label>
        <ul>
            <li>{{ news.updateTime | timeformater }}</li>
            <li class="title">{{ news.title }}</li>
            <li>{{ news.pageView }}&nbsp;次浏览</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NewsBox',
    props: ['news', 'index']
}
</script>

<style scoped>
.news {
    background-color: white;
    width: 100%;
    min-width: 1300px;
    height: 15vw;
    min-height: 300px;
    padding: 0 10vw;
    transition: 0.25s;
    color: white;
    cursor: pointer;

    /* 子元素垂直居中 */
    display: flex;
    align-items: center;
}

.news:hover {
    padding-left: 15vw;
    background-color: #656565;
}

label {
    display: block;
    background-color: #e31d3b;
    width: 95px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 35px;
    font-weight: 500;
    user-select: none;
}

ul {
    list-style: none;
    margin-left: 12vw;
    height: 210px;
}

li {
    height: 70px;
    width: 500px;
    line-height: 70px;
    font-size: 20px;
    color: #626262;
    font-weight: 500;
    white-space:nowrap;
}

li:nth-child(2) {
    font-size: 25px;
}

.news:hover li {
    color: white;
}

.news:hover li:nth-child(2) {
    color: #e31d3b;
}
</style>