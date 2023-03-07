<template>
    <div class="bodyer">
        <div class="content">
            <div class="title">
                <h1>{{ news.title }}</h1>
            </div>
            <div class="date">
                <h5>{{ news.updateTime | timeformater }}</h5>
            </div>
            <div class="text" v-html="news.text"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewsContent',
    props: ['id'],
    data() {
        return {
            news: {}
        }
    },
    mounted() {
        if (this.id) {
            this.myAxios({
                url: '/News/get',
                params: {
                    id: this.id
                },
                success: (response) => {
                    this.news = response.data;
                }
            });
        }
    }
}
</script>

<style scoped>
.content {
    width: 70vw;
    min-width: 1300px;
    min-height: calc(100vh - 5vw - 195px);
    margin: 0 auto;
    padding: 20px 50px;
    box-shadow: 0 0 5px 2px #888;
    background-color: white;
}

.title,
.date {
    text-align: center;
    padding: 20px 0;
}

.text {
    padding-top: 20px;
    font-size: 16px;
}
</style>