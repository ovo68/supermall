export default {
  addCart(context,payload){
    /*let oldProduct = null;
    for (let item of state.cartList){
      if (item.iid ===payload.iid){
        oldProduct = item
      }
    }*/
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item=>item.iid===payload.iid)
      //2.判断oldProduct
      if (oldProduct){
        context.commit('addCounter',oldProduct);
        resolve('当前商品+1')
      }else {
        payload.count = 1;
        context.commit('addToCart',payload)
        resolve('添加新商品')
      }
    })

  }
}