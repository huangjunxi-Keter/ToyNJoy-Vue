<template>
    <div id="new_news_3">
        <!--最新的前3条新闻-->
        <p>
            <span>新闻消息</span>
        </p>
        <div v-for="(n, index) in news" :content="`@(${index + 1})`" class="news" :nid="n.id">
            <div :class="`content nn5_c@(${index + 1})`">
                <label>{{ index + 1 }}</label>
                <ul>
                    <li>{{ n.updateTime }}</li>
                    <li class="title">{{ n.title }}</li>
                    <li>{{ n.commend }}&nbsp;人觉得很赞</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home_News',
    data() {
        return {
            news: []
        }
    },
    mounted() {
        this.axiosGet('News/find', { orderby: 'UpdateTime', count: 3 })
            .then((response) => {
                this.news = response.data
                console.log(this.news);
            })
            .catch(function (error) {
                console.log(error);
            });;
    }
}
</script>

<style scoped>
#new_news_3>p {
    /*新闻前3*/
    line-height: 3vw;
    padding: 1vw 2.5vw;
    font-size: 1.7vw;
    font-weight: bold;
    margin: 0;
    /*background-color: pink;*/
}

#new_news_3>p>span {
    display: block;
    text-align: center;
    width: 7vw;
    border-bottom: 0.4vw solid red;
    user-select: none;
}

#new_news_3>div {
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

#new_news_3 .content {
    border: 0.02vw solid #d6d6d6;
    /*width:40%;*/
}

#new_news_3 .content>* {
    float: left;
}

#new_news_3 .content>label {
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

#new_news_3 .content>ul {
    list-style: none;
    margin-left: 12vw;
    margin-top: 3vw;
    height: 12vw;
    color: black;
}

#new_news_3 .content>ul>li {
    height: 4vw;
    line-height: 4vw;
    font-size: 1vw;
    color: #626262;
    font-weight: 500;
}

#new_news_3 .content>ul>.title {
    font-size: 1.35vw;
    font-weight: 700;
}
</style>