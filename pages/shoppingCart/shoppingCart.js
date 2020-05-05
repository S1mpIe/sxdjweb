// pages/shoppingCart/shoppingCart.js
Page({
  data:{
    goodsList:[],
    totalPrice:0,
  },
  onLoad(query) {
    wx.getStorage({
      key:"accessToken",
      success:(result => {
        wx.request({
          url:'http://www.s1mpie.top:8080/sxdj/shoppingCart',
          method:'get',
          header:{
            accessToken:result.data
          },
          success:(res=>{
            this.setData({
              goodsList:res.data.goodsList
            });
            wx.setStorage({
              key:"shoppingCart",
              data:res.data.goodsList
            })
          })
        });
      })
    })
  },
  handleChange(e){
    console.log(e)
  },
  flushCart(Cart){
    this.setData({
      goodsList:Cart
    })
  }
})