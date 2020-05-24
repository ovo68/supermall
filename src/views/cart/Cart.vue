<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{cartNumber}})</div>
    </nav-bar>

    <!--商品列表-->
    <cart-list/>

    <!--底部汇总-->
    <check-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childCpn/CartList";
  import CheckBottomBar from "./childCpn/CheckBottomBar";
  export default {
    name: "Cart",
    components: {CheckBottomBar, CartList, NavBar},
    computed:{
      cartNumber(){
        return this.$store.state.cartList.length
      }
    }

  }
</script>

<style scoped>
  .cart-nav-bar{
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }
</style>