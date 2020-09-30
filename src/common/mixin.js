import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log("hunru");
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.content.scrollTo(0, 0, 1000)
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }

  }
}