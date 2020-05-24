import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  // console.log('执行函数');

  //将Toast组件加入到HTML（body）页面中
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  //2.通过new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()

  //3.将组件对象，手动挂载到某一个对象上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是toast所挂载的div元素  再将div加入到body中
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast//将toast组件对象添加到Vue的原型中
}

export default obj