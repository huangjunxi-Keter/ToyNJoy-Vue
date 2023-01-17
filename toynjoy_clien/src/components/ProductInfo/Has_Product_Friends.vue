<template>
    <div id="Has_Product_Friends">
        <p v-if="!isLogin">
            <a @click.prevent="go('login')">加入<label>ToyNJoy</label>与好友一起游玩</a>
        </p>
        <ul v-else-if="isLogin && hasProductFriends.length > 0">
            <li>您有{{ hasProductFriends.length }}位好友拥有这款游戏</li>
            <li v-for="friend in hasProductFriends">
                <a :uid="friend.username" class="p_friend"
                    :style="{ 'background-image': `url('${getImage('user/' + friend.virtual_image)}')` }">
                </a>
            </li>
        </ul>
        <p v-else>您还没有好友拥有这款游戏</p>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'Has_Product_Friends',
    computed: {
        ...mapState(['isLogin'])
    },
    props: ['hasProductFriends']
}
</script>

<style scoped>
#Has_Product_Friends {
    height: 5vw;
    line-height: 5vw;
    margin: 1.5vw auto;
    box-shadow: 0 0 0.2vw 0.05vw #aeaeae;
}

#Has_Product_Friends>p {
    text-align: center;
    font-size: 1.5vw;
    letter-spacing: 0.25vw;
    color: #606060;
    user-select: none;
}

#Has_Product_Friends>p>a {
    text-decoration-line: none;
    color: #808080;
}

#Has_Product_Friends>p>a:hover {
    color: #54b5f5;
}

#Has_Product_Friends>p>a>label {
    letter-spacing: 0;
    font-weight: 500;
    margin-right: 0.25vw;
}

#Has_Product_Friends>ul {
    list-style: none;
    height: 100%;
    width: 68vw;
    margin: auto;
    color: #808080;
}

#Has_Product_Friends>ul>li {
    float: left;
    height: 100%;
}

#Has_Product_Friends>ul>li:nth-child(1) {
    font-size: 1.2vw;
    margin-right: 1vw;
    user-select: none;
}

#Has_Product_Friends>ul>li span {
    color: #656565;
    font-weight: 500;
}

#Has_Product_Friends>ul>li>a {
    display: block;
    height: 3.5vw;
    width: 3.5vw;
    border-radius: 1.75vw;
    margin: 0.75vw 0.5vw;
    box-shadow: 0 0 0.2vw 0.05vw #aeaeae;
    background-size: 100% 100%;
    background-position: center;
    cursor: pointer;
}
</style>