<template>
    <div id="footer">
        <p>健康游戏忠告：抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>
        <ul>
            <li><a href="#">商务合作</a></li>
            <li><a href="#">平台简介</a></li>
            <li><a href="#">用户协议</a></li>
            <li><a href="#">联系客服</a></li>
            <li><a href="#">关于我们</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Clien_Footer'
}
</script>

<style scoped>
#footer {
    width: 100%;
    min-width: 1000px;
    margin-top: 20px;
    padding: 45px 0 60px 0;
    background-color: white;
    box-shadow: 0 0 10px 0.5px #bbbbbb;
}

#footer p {
    color: white;
    text-align: center;
    margin: 20px;
    color: #8f8f8f;
}

#footer>ul {
    width: 500px;
    margin: 0 auto;
    display: flex;
}

#footer>ul>li {
    list-style: none;
    flex: 1;
    text-align: center;
}

#footer>ul>li>a {
    color: #54a6f5;
}
</style>