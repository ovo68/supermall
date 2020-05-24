<template>
  <div id="home">
    <!--顶部栏-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 ref="tabControl1"
                 @tabClick="tabClick"
                 class="tabControl" v-show="isTabFixed"/>
    <!--滚动功能-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--轮播图 轮播的图片由网络请求得到-->
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
      <!--推荐 推荐的图片由网络请求得到-->
      <recommend-view :recommends="recommends" ref="recommends"/>
      <!--流行推荐推荐  就是一张图片-->
      <feature-view/>
      <!--流行','新款','精选' 页面选择-->
      <tab-control :titles="['流行','新款','精选']"
                   ref="tabControl2"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--回到顶部按键-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from "./childCpn/HomeSwiper";
  import RecommendView from "./childCpn/RecommendView";
  import FeatureView from "./childCpn/FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";

  import {getHomeMultiData, getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";
  import BackTop from "../../components/content/backTop/BackTop";


  export default {
    name: "Home",
    components: {
      BackTop,
      Scroll,
      GoodsList,
      TabControl,
      FeatureView,
      RecommendView,
      HomeSwiper,
      NavBar
    },
    data() {
      return {
        banner: [],
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
        //记录滚动的距离
        saveY: 0,
        itemImgListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
    ,
    created() {
      //1.请求多个数据
      this.getHomeMultiData();

      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      //3.监听item中的图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 300);
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener
      )
      //4.获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
    },
    destroyed() {
      // console.log('destroy')
    },
    activated() {
      console.log('activated')
      this.$refs.scroll.refresh()

      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      // console.log('deactivated')
      //1.保存上滑的Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      //请求更多数据方法
      loadMore() {
        // console.log('asdasdas')
        this.getHomeGoods(this.currentType)
      },
      //是否显示回到顶部按键方法
      contentScroll(position) {
        //1.判断回到顶部按键是否显示
        this.isShowBackTop = -position.y > 1000;
        //2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //回到顶部方法
      backClick() {
        // console.log('asd')
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      //监听图书加载发射出来的事件的监听方法
      swiperImageLoad() {
        //所有的组件都有一个属性$el:用于获取组件中的元素
        // console.log(this.$refs.tabControl2.$el.offsetTop)
        // console.log(this.$refs.recommends.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /*
      * 事件监听
      * */
      //监听吸顶选项的方法
      tabClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      /*
      * 网络请求方法
      * */
      //请求 轮播图和推荐 数据并进行封装到data中的方法
      getHomeMultiData() {
        //1.请求多个数据
        getHomeMultiData().then(res => {
          // console.log(res)
          this.banner = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      //请求吸顶数据的方法
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res.data)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>

  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*使用原生滚动时设置的定位
    position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 5;*/
  }

  .tabControl {
    position: relative;
    z-index: 20;
    background-color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*
    方法1
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;*/
  }
</style>