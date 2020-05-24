<template>
  <swiper  class="swiperClass">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "../../../components/common/swiper";
  export default {
    name: "DetailSwiper",
    components: {SwiperItem, Swiper},
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .swiperClass{
    height: 300px;
    overflow: hidden;
  }
</style>