<template>
    <div class="bodyer">
        <div class="page-content">
            <div class="news-top">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div v-for="(news, index) in newsTop" :class="`carousel-item ${index === 1 ? 'active' : ''}`">
                            <div class="news-item"
                                :style="{ 'background-image': `url(${getImage('news/cover/' + news.image)})` }"
                                @click="go('newsContent', { id: news.id })">
                                <div class="title">{{ news.title }}</div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-target="#carouselExampleIndicators"
                        data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-target="#carouselExampleIndicators"
                        data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </button>
                </div>
            </div>
            <div class="news-list">
                <div class="search-box">
                    <input type="text" v-model="title" placeholder="根据标题搜索" />
                </div>
                <news-box v-for="(n, index) in news" :news="n" :index="getNewsIndex(index)" />
                <pagination style="margin-top: 20px;" :page="page" @updateData="chnagePage" />
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/carousel';
import News_Box from '@/components/News_Box.vue';
import Pagination from '@/components/Basic/Pagination.vue';

export default {
    name: 'News',
    components: {
        "news-box": News_Box,
        'pagination': Pagination
    },
    data() {
        return {
            newsTop: [],
            news: [],
            title: '',
            page: {
                dataTotal: 0,
                pageItem: 5,
                pageTotal: 0,
                previous: 0,
                nowPage: 1,
                next: 2
            },
            searchTimeOut: null
        }
    },
    watch: {
        title() {
            // 防抖
            if (this.searchTimeOut)
                clearTimeout(this.searchTimeOut);
            this.searchTimeOut = setTimeout(() => {
                this.searchNews();
            }, 300);
        }
    },
    methods: {
        searchNews() {
            let params = {
                title: this.title
            };
            this.myAxios({
                url: '/News/findCount',
                params,
                success: (response) => {
                    this.page.dataTotal = response.data;
                    this.page.pageTotal = Math.ceil(this.page.dataTotal / this.page.pageItem);
                    params.page = this.page.nowPage - 1;
                    params.count = this.page.pageItem;
                    params.orderby = "UpdateTime";
                    this.myAxios({
                        url: "/News/find",
                        params,
                        success: (response) => {
                            this.news = response.data;
                        }
                    });
                }
            });
        },
        chnagePage(newPage) {
            this.page.nowPage = newPage;
            this.searchNews();
        },
        getNewsIndex(index) {
            return (this.page.nowPage - 1) * this.page.pageItem + index;
        }
    },
    mounted() {
        // 顶部的三条新闻
        this.myAxios({
            url: "/News/find",
            params: {
                orderby: "UpdateTime",
                count: 3
            },
            success: (response) => {
                this.newsTop = response.data;
            }
        });
        // 获取新闻列表
        this.searchNews();
    }
}
</script>

<style scoped>
.page-content {
    width: 80vw;
    min-width: 1300px;
    margin: 0 auto;
    padding-bottom: 20px;
    background-color: white;
    box-shadow: 0 0 5px 2px #999;
}

.news-top,
.carousel,
.carousel-inner,
.carousel-item,
.news-top .news-item {
    width: 80vw;
    min-width: 1300px;
    height: 30vw;
    min-height: 485px;
}

.news-top .news-item {
    position: relative;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    background-color: #ddd;
}

.news-top .news-item .title {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    background-color: rgba(0, 0, 0, 1);
    color: white;
    font-size: 20px;
}

.search-box {
    background-color: rgba(0, 0, 0, 1);
    padding: 15px 10px;
}

.search-box input {
    outline: 0;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    border-radius: 20px;
}
</style>