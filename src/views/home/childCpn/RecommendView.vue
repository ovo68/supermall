<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" @load="recommendsLoad" alt=""/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    methods:{
      recommendsLoad(){
        if (!this.isLoad){
          this.$emit("recommendsLoad")
          this.isLoad = true;
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 18px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    /*width: 65px;*/
    /*height: 65px;*/
    width: 95%
  }
</style>