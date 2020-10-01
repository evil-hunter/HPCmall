<template>
  <div id="detail">
    <DetailNavVar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavVar>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <DetailBaseInfo :goods="GoodsInfo"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </Scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <BackTop @click.native="backTopClick" v-show="isShowBackTop"></BackTop>
    <Toast :message="message" :show="show"></Toast>
  </div>
</template>

<script>
  import DetailNavVar from "./childComponents/DetailNavVar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childComponents/DetailBottomBar";
  import BackTop from "../../components/content/backTop/BackTop";
  import Toast from "../../components/common/toast/Toast";
  import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";


  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        GoodsInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themePos: [],
        getThemePos: null,
        currentIndex: 0,
        isShowBackTop: false,
        message: '',
        show: false
      }
    },
    created() {
      this.iid = this.$route.params.iid
      //  请求数据
      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = res.result.itemInfo.topImages
        this.GoodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      this.getThemePos = debounce(() => {
        this.themePos = []
        this.themePos.push(0)
        this.themePos.push(this.$refs.params.$el.offsetTop)
        this.themePos.push(this.$refs.comment.$el.offsetTop)
        this.themePos.push(this.$refs.recommend.$el.offsetTop)
      })
    },

    mounted() {
      let newRefresh = debounce(this.$refs.scroll.refresh,100)
      this.itemImgListener = () => {
        newRefresh()
      }
      this.$bus.$on('itemImgLoad', this.itemImgListener)
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0, 1000)
      },
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemePos()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themePos[index], 100)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
        const positionY = -position.y
        let length = this.themePos.length
        for(let i = 0; i < length; i++){
          if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themePos[i] && positionY < this.themePos[i + 1]) ||
                  (i === length - 1 && positionY >= this.themePos[i])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addCart() {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.GoodsInfo.title;
        product.desc = this.GoodsInfo.desc;
        product.price = this.GoodsInfo.realPrice;
        product.iid = this.iid;
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res, 1500)
        })
      }

    },
    components: {
      GoodsList,
      DetailNavVar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      GoodsParam,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BackTop,
      Toast
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>