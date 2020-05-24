<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :images-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import DetailNavBar from "./childCpn/DetailNavBar";
  import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";
  import DetailSwiper from "./childCpn/DetailSwiper";
  import DetailBaseInfo from "./childCpn/DetailBaseInfo";
  import DetailShopInfo from "./childCpn/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childCpn/DetailGoodsInfo";
  import DetailParamInfo from "./childCpn/DetailParamInfo";
  import DetailCommentInfo from "./childCpn/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import GoodsListItem from "../../components/content/goods/GoodsListItem";
  import {backTopMixin, itemListenerMixin} from "../../common/mixin";
  import DetailBottomBar from "./childCpn/DetailBottomBar";
  import {mapActions} from 'vuex'
  import Toast from "../../components/common/toast/Toast";
  export default {
    name: "Detail",
    components: {
      Toast,
      DetailBottomBar,
      GoodsListItem,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo,
      DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar, NavBar
    },
    mixins: [itemListenerMixin],//混入 此处混入到生命周期函数中
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {
          type: Object,
          default() {
            return {}
          }
        },
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [],
        currentIndex:0,
      }
    },
    mixins:[backTopMixin],
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid;
      //2.根据保存的iid请求数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result;
        //1.获取顶部轮播图片
        this.topImages = data.itemInfo.topImages;
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods)
        //3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        /*        this.$nextTick(() => {
                  //根据最新的数据，对应的DOM是已经被渲染出来
                  //但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)，
                  // offsetTop值不对的时候， 都是因为图片的问题

                  this.themeTopYs = [];
                  this.themeTopYs.push(0);
                  this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                  this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                  this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
                  console.log(this.themeTopYs)
                })*/

      });
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
      })
    },

    /* 获取不同组件的offsetTop并进行赋值的方法1 在updated中进行赋值 可能不行
      updated() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      console.log(this.themeTopYs)
    },*/
    mounted() {

      //监听item中的图片加载完成
      //使用混入进行替代
      // const refresh = debounce(this.$refs.scroll.refresh,300);
      // this.itemImgListener = ()=>{
      //   refresh()
      // };
      // this.$bus.$on('itemImageLoad',this.itemImgListener)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),//映射vuex中的actions中的方法 之后可以this.方法 直接调用
      imgLoad() {
        this.$refs.scroll.refresh()
        // console.log('***')
        // 获取不同组件的offsetTop并进行赋值的方法1
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        this.themeTopYs.push((this.$refs.recommends.$el.offsetTop)+1000);
        // console.log(this.themeTopYs)
      },
      titleClick(index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
      },
      contentScroll(position) {
        //1.获取y值
        // console.log(position.y)
        const positionY = -position.y;
        const length = this.themeTopYs.length;
        //2.将获取的y值与themeTopYs中保存的值对比
        for (let i = 0; i < this.themeTopYs.length-1; i++) {
          if (this.currentIndex!==i &&(positionY>=this.themeTopYs[i]&&positionY<=this.themeTopYs[i+1])){
            this.currentIndex  = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
          /*if (this.currentIndex!==i &&//this.currentIndex!==i 防止赋值操作过于频繁
              ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <
              this.themeTopYs[i + 1]) | (i === length - 1 && positionY > this.themeTopYs[i])))
          {
            this.currentIndex  = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex;
          }*/
        }
        //1.判断回到顶部按键是否显示
        this.isShowBackTop = -position.y > 1000;
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车  不要直接加入state  使用actions->mutations进行加入
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res)
        // })
        this.addCart(product).then(res=>{
          this.$toast.show(res)
          // console.log(this.$toast)
        })
        //     .then(res=>{
        //   // console.log(res)
        //   this.message = res;
        //   this.isShow = true
        //
        //   setTimeout(()=>{
        //     this.isShow = false;
        //     this.message = ''
        //   },1500)
        // })
      }
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
    background-color: white;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>