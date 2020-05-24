<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
    data(){
      return {
        scroll:null
      }
    },
    props:{
      probeType: {
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        //对于元素中的button子元素无论是true还是false都可以进行点击
        //但是对于button之外的元素 就必须设置为true才可以进行点击事件
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //监听滚动的位置
      this.scroll.on('scroll', position => {
        // console.log(position);
        this.$emit('scroll',position)
      })
      //监听上拉事件
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })


    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        //重置上拉事件
        this.scroll.finishPullUp()
      },
      refresh(){
        // console.log('----------')
        this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll? this.scroll.y:0
      }
    }
  }
</script>

<style scoped>

</style>