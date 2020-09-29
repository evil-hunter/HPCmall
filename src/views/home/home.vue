<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">精品推荐</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <Scroll class="content"
            ref="content"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
        <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <home-recommend-view :recommends="recommends"/>
        <HomeFeature></HomeFeature>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                    ref="tabControl2"/>
        <GoodsList :goods="showGoods"/>
    </Scroll>
    <BackTop @click.native="backTopClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import HomeFeature from "./childComponents/HomeFeature";
  import GoodsList from "../../components/content/goods/GoodsList";

  import TabControl from "../../components/content/tabControl/TabControl";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultiData, getHomeGoods} from "network/home";
  import {debounce} from "../../common/utils";

  export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.content.scrollTo(0, this.saveY, 0)
      this.$refs.content.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.content.getCurrentY()
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
    //  1.请求多个数据
      this.getHomeMultiData()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
    const refresh = debounce(this.$refs.content.refresh, 100)
      this.itemImgListener = () => {
        refresh()
      }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
     methods: {
      //网络请求
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.content.finishPullUp()
        })
      },
      //事件监听
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backTopClick() {
        this.$refs.content.scrollTo(0, 0, 1000)
      },
      contentScroll(position) {
        //判断backtop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //  决定是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.content.scroll.refresh()
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
