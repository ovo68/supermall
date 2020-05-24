<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex; /*弹性布局*/
    background-color: #f6f6f6;

    position: fixed; /*元素的位置相对于浏览器窗口是固定位置。即使窗口是滚动的它也不会移动：*/
    right: 0;
    left: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100, 100, 100, .08);
  }

</style>