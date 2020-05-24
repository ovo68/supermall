<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="checkedAll" :is-checked="isSelectAll" @click.native="checkAll"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      <span>去结算({{checkedLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CheckBottomBar",
    components: {CheckButton},

    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥'+ this.$store.getters.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
            return preValue+item.price * item.count
        },0).toFixed(2)
      },
      checkedLength(){
        return this.$store.getters.cartList.filter(item=>item.checked).length
      },
      isSelectAll(){
        // return !(this.cartList.filter(item=>!item.checked).length>0)
        if (this.cartList.length===0) return  false
        return !this.cartList.find(item=>!item.checked)
      }
    },
    methods:{
      checkAll(){
        // console.log('1111')
        if(this.isSelectAll){//全部选中情况下
          this.cartList.forEach(item=>item.checked=false)
        }else{
          this.cartList.forEach(item=>item.checked=true)
        }
      },
      calcClick(){
        if(this.cartList.filter(item=>!item.checked).length===this.cartList.length){
          this.$toast.show('请选择要购买的商品')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    position: relative;
    background-color: #cccccc;
    line-height: 40px;height: 40px;
    font-size: 14px;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .checkedAll{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .total-price{
    margin-left: 40px;
    flex: 1;
  }
  .calculate{
    background-color: #ff5777;
    margin-left: 10px;
    width: 75px;
    text-align: center;
  }
</style>