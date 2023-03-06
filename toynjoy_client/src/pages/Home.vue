<template>
  <div>
    <div id="display_board_list">
      <!--最新的前4个游戏-->
      <div v-for="product in displayBoardData">
        <display-board :products="displayBoardData" :product="product" />
      </div>
    </div>
    <home-news :news="homeNewsData" />
    <rotation-banner rid="purchases" title="销量冠军" :productsActive="rotationBannerData_purchasesTop_active"
      :products="rotationBannerData_purchasesTop" />
    <rotation-banner rid="browse" title="最受关注" :productsActive="rotationBannerData_browseTop_active"
      :products="rotationBannerData_browseTop" />
  </div>
</template>

<script>
import Display_Board from '@/components/Home/Display_Board.vue';
import Home_News from '@/components/Home/Home_News.vue';
import Rotation_Banner from '@/components/Rotation_Banner.vue';

export default {
  name: 'Home',
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
  components: {
    'display-board': Display_Board,
    'home-news': Home_News,
    'rotation-banner': Rotation_Banner
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
#display_board_list {
  /*商品前4*/
  width: 100%;
  min-width: 1300px;
  /* height: 100vh;
    min-height: 800px; */
  user-select: none;
}
</style>
