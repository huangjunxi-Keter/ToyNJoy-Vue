<template>
    <div id="home_news">
        <!--最新的前3条新闻-->
        <p>
            <span>新闻消息</span>
        </p>
        <div v-for="(n, index) in news" class="news">
            <div class="content">
                <label>{{ index + 1 }}</label>
                <ul>
                    <li>{{ n.title }}</li>
                    <li>{{ n.updateTime | timeformater }}</li>
                    <li>{{ n.commend }}&nbsp;人觉得很赞</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home_News',
    filters: {
        timeformater(dateStr) {
            let result = dateStr.split('T')[0];
            let dateArr = result.split('-');
            result = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
            return result;
        }
    },
    props: ['news']
}
</script>

<style scoped>
#home_news>p {
    font-weight: bold;
    font-size: 25px;
    line-height: 45px;
    padding: 1vw 2vw;
    margin: 0;
}

#home_news>p>span {
    display: block;
    text-align: center;
    width: 105px;
    border-bottom: 6.5px solid red;
    user-select: none;
}

.news {
    background-color: white;
    /* width: 100%; */
    height: 18vw;
    padding: 0 10vw;
    transition: 0.25s;
    position: relative;
    color: white;
    background-repeat: no-repeat;
    background-size: 45%;
    background-position: 90% 50%;
    cursor: pointer;
}

.news:nth-child(3) {
    /* border:0.02vw solid #d6d6d6; */
}

.news:hover {
    background-color: #656565;
    background-Image: url('http://localhost:8080/System/file/image?name=system/blackgoat.png');
}

.content>* {
    float: left;
}

.content>label {
    display: block;
    background-color: #e31d3b;
    width: 5vw;
    height: 4.5vw;
    line-height: 4.5vw;
    text-align: center;
    font-size: 2vw;
    position: absolute;
    top: 6.75vw;
    font-weight: 500;
    user-select: none;
}

.content>ul {
    list-style: none;
    margin-left: 12vw;
    margin-top: 3vw;
    height: 12vw;
}

.content li {
    height: 4vw;
    line-height: 4vw;
    font-size: 1vw;
    color: #626262;
    font-weight: 500;
}

.content li:nth-child(1) {
    font-size: 1.5vw;
}

.news:hover li {
    color: white;
}
</style>