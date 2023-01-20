<!-- <template>
<div id="right">
        <ul>
            <li>地区：<span>{{ userInfo.address }}</span></li>
            <li>生日：<span>{{ userInfo.birthday }}</span></li>
            <li>游戏&nbsp;<span class="big">@Model.Library.ToList().Count</span></li>
            <li>好友&nbsp;<span class="big">@Model.Friend.ToList().Count</span></li>
            <li class="line"></li>
            @foreach (var item in Model.Friend.ToList().Take(5))
            {
            <li class="p_friend" uid="@item.Users1.username">
                <div class="virtual_image"
                    style="background-image:url('../../Content/Image/user/@item.Users1.virtual_image')"></div>
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
            }
        </ul>
    </div>
</template>

<script>
export default {
    name: 'User_Info_Show'
}
</script>

<style>

</style> -->