<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="blue">
      <img slot="item-icon" src="../../../assets/img/tabbar/home_active.svg" alt=""/>
      <img slot="item-icon-active" src="../../../assets/img/tabbar/home.svg" alt=""/>
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" active-color="skyblue">
      <img slot="item-icon" src="../../../assets/img/tabbar/category.svg" alt=""/>
      <img slot="item-icon-active" src="../../../assets/img/tabbar/category_active.svg" alt=""/>
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" active-color="deeppink">
      <img slot="item-icon" src="../../../assets/img/tabbar/cart.svg" alt=""/>
      <img slot="item-icon-active" src="../../../assets/img/tabbar/cart_active.svg" alt=""/>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="../../../assets/img/tabbar/profile_active.svg" alt=""/>
      <img slot="item-icon-active" src="../../../assets/img/tabbar/profile.svg" alt=""/>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from "../../common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components:{
      TabBarItem,
      TabBar
    }
  }
</script>

<style scoped>

</style>