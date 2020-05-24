<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    // props:{
    //   message:{
    //     type:String,
    //     default:''
    //   },
    //   isShow:{
    //     type: Boolean,
    //     default: false
    //   }
    // }
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, time=1500) {
        this.isShow = true;
        this.message = message;
        setTimeout(()=>{
          this.isShow = false;
          this.message = ''
        },time)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;

    padding: 10px;
    transform: translate(-50%, -50%);
    color: white;
    background-color: rgba(0, 0, 0, .7);

    z-index: 20;
  }
</style>