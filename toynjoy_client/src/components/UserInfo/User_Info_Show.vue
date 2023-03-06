<template>
    <div id="userInfoShow">
        <ul>
            <li>地区：<span>{{ userInfo.address }}</span></li>
            <li>生日：<span>{{ userInfo.birthday }}</span></li>
            <li>游戏&nbsp;<span class="big">0</span></li>
            <li>好友&nbsp;<span class="big">0</span></li>
            <li class="line"></li>
            <!-- @foreach (var item in Model.Friend.ToList().Take(5))
            {
            <li class="p_friend" uid="@item.Users1.username">
                <div class="virtual_image"
                    style="background-image:url('../../Content/Image/user/@item.Users1.virtual_image')">
                </div>
                @{
                if (item.Users1.state == 1)
                {
                <div class="user_name" style="color:#88e900">@item.Users1.nickname</div>
                <div class="user_state" style="color:#09b2fc">在线</div>
                }
                else if (item.Users1.state == 0)
                {
                <div class="user_name" style="color:#aeaeae">@item.Users1.nickname</div>
                <div class="user_state" style="color:#aeaeae">离线</div>
                }
                }
                <div class="lv">LV@(item.Users1.Lv)</div>
            </li>
            } -->
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'User_Info_Show',
    computed: {
        ...mapState('user', ['userData', 'userInfo'])
    }
}
</script>

<style scoped>
#userInfoShow {
    width: 20vw;
    min-width: 240px;
    height: 29vw;
    min-height: calc(500px - 1vw);
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 0.25vw 0.15vw #dadada;
}

#userInfoShow>ul {
    list-style: none;
    padding: 1vw 2vw;
}

#userInfoShow .state {
    height: 2vw;
    font-size: 1.5vw;
    color: #09b2fc;
    font-weight: initial;
    user-select: none;
}

#userInfoShow li {
    font-size: 1vw;
    font-weight: bold;
    color: #656565;
    margin-bottom: 0.5vw;
}

#userInfoShow li>span {
    font-weight: initial;
    color: #959595;
}

#userInfoShow .big {
    font-size: 1.35vw;
    color: #aeaeae;
}

#userInfoShow .line {
    height: 0.01vw;
}

#userInfoShow .p_friend {
    height: 2.5vw;
    margin-bottom: 1vw;
    position: relative;
    font-weight: initial;
    border-radius: 1.5vw 0.8vw 0.8vw 1.5vw;
    cursor: pointer;
    transition: 0.25s;
}

#userInfoShow .p_friend:hover {
    background: #e0e0e0;
}

#userInfoShow .p_friend>* {
    position: absolute;
}

#userInfoShow .virtual_image {
    top: 0;
    left: 0;
    height: 2.5vw;
    width: 2.5vw;
    background-size: 100% 100%;
    border-radius: 1.75vw;
}

#userInfoShow .user_name {
    top: 0;
    left: 3vw;
}

#userInfoShow .user_state {
    top: 1.2vw;
    left: 3vw;
    font-size: 0.7vw;
    user-select: none;
}

#userInfoShow .lv {
    background-color: #09b2fc;
    width: 2vw;
    height: 1vw;
    line-height: 1vw;
    text-align: center;
    font-size: 0.6vw;
    color: white;
    border-radius: 0.2vw;
    top: 0.75vw;
    right: 1vw;
    user-select: none;
}
</style>