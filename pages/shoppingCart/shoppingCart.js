// pages/shoppingCart/shoppingCart.js
Page({
  data:{
    accessToken:'',
    goodsList:[],
    totalPrice:0,
  },
  onShow(query) {
    wx.getStorage({
      key:"accessToken",
      success:(result => {
        this.setData({
          accessToken:result.data
        });
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
  deleteThisGoods(e){
    var cart=this.data.goodsList;
    var item=cart[e.currentTarget.dataset.index];
    console.log(item);
    wx.request({
      url:"http://www.s1mpIe.top:8080/sxdj/shoppingCart?id="+item.id,
      method:'delete',
      header:{
        accessToken:this.data.accessToken
      },success:(result => {
        cart.splice(e.currentTarget.dataset.index,1);
        this.flushCart(cart);
      })
    })
  },
  handleChange(e){
    var cart = this.data.goodsList;
    var index = e.currentTarget.dataset.index;
    cart[index].selectNumber=e.detail.value;
    wx.request({
      url:"http://www.s1mpie.top:8080/sxdj/shoppingCart?id="+cart[index].id+"&number="+e.detail.value,
      method:'post',
      header:{
        accessToken:this.data.accessToken
      },
      success:(result => {
        this.flushCart(cart);
      })
    })
  },
  flushCart(Cart){
    this.setData({
      goodsList:Cart
    })
  }
})