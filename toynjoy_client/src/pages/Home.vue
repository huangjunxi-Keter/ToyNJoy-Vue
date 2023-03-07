<template>
  <div>
    <!--最新的前4个游戏-->
    <div class="display_board_list">
      <div v-for="product in displayBoardData">
        <display-board :products="displayBoardData" :product="product" />
      </div>
    </div>
    <!--最新的前3条新闻-->
    <div class="home_news">
      <p>
        <span>新闻消息</span>
      </p>
      <news-box v-for="(news, index) in homeNewsData" :news="news" :index="index" />
    </div>
    <rotation-banner rid="purchases" title="销量冠军" :productsActive="rotationBannerData_purchasesTop_active"
      :products="rotationBannerData_purchasesTop" />
    <rotation-banner rid="browse" title="最受关注" :productsActive="rotationBannerData_browseTop_active"
      :products="rotationBannerData_browseTop" />
  </div>
</template>

<script>
import Display_Board from '@/components/Home/Display_Board.vue';
import Rotation_Banner from '@/components/Rotation_Banner.vue';
import News_Box from '@/components/News_Box.vue';

export default {
  name: 'Home',
  components: {
    'display-board': Display_Board,
    'rotation-banner': Rotation_Banner,
    'news-box': News_Box,
  },
  data() {
    return {
      displayBoardData: [],
      homeNewsData: [],
      rotationBannerData_purchasesTop_active: [],
      rotationBannerData_purchasesTop: [],
      rotationBannerData_browseTop_active: [],
      rotationBannerData_browseTop: [],
    }
  },
  mounted() {
    //#region 顶部大模块数据
    this.myAxios({
      url: 'Product/find',
      params: { orderby: 'ReleaseDate', count: 4 },
      success: (response) => {
        this.displayBoardData = response.data;
      }
    });
    //#endregion

    //#region 新闻模块数据
    this.myAxios({
      url: 'News/find',
      params: { orderby: 'UpdateTime', count: 3 },
      success: (response) => {
        this.homeNewsData = response.data;
      }
    });
    //#endregion

    //#region 购买量最多的前8个
    this.myAxios({
      url: 'Product/find',
      params: { orderby: 'Purchases', count: 8 },
      success: (response) => {
        for (let i = 0; i < 4; i++) {
          this.rotationBannerData_purchasesTop_active.push(response.data[i]);
        }
        for (let i = 4; i < 8; i++) {
          this.rotationBannerData_purchasesTop.push(response.data[i]);
        }
      }
    });
    //#endregion

    //#region 浏览量量最多的前8个
    this.myAxios({
      url: 'Product/find',
      params: { orderby: 'Browse', count: 8 },
      success: (response) => {
        for (let i = 0; i < 4; i++) {
          this.rotationBannerData_browseTop_active.push(response.data[i]);
        }
        for (let i = 4; i < 8; i++) {
          this.rotationBannerData_browseTop.push(response.data[i]);
        }
      }
    });
    //#endregion
  }
}
</script>

<style scoped>
.display_board_list {
  /*商品前4*/
  width: 100%;
  min-width: 1300px;
  height: 100vh;
  user-select: none;
}

.home_news {
  clear: both;
}

.home_news>p {
  font-weight: bold;
  font-size: 25px;
  line-height: 45px;
  padding: 1vw 2vw;
  margin: 0;
}

.home_news>p>span {
  display: block;
  text-align: center;
  width: 105px;
  border-bottom: 6.5px solid red;
  user-select: none;
}
</style>
