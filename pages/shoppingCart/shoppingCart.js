// pages/shoppingCart/shoppingCart.js
Page({
  data:{
    accessToken:'',
    goodsList:[],
    selectList:[],
    totalPrice:0,
    selectNumber:0
  },
  onShow(query) {
    wx.getStorage({
      key:"accessToken",
      success:(result => {
        this.setData({
          accessToken:result.data
        });
        wx.request({
          url:'https://www.s1mpie.top:453/sxdj/shoppingCart',
          method:'get',
          header:{
            accessToken:result.data
          },
          success:(res=>{
            var midSelectList=new Array(res.data.goodsList.length);
            midSelectList.fill(false);
            this.setData({
              goodsList:res.data.goodsList,
              selectList:midSelectList
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
    let cart=this.data.goodsList;
    let item=cart[e.currentTarget.dataset.index];
    let selected = this.data.selectList;
    console.log(item);
    wx.request({
      url:"https://www.s1mpIe.top:453/sxdj/shoppingCart?id="+item.id,
      method:'delete',
      header:{
        accessToken:this.data.accessToken
      },success:(result => {
        cart.splice(e.currentTarget.dataset.index,1);
        selected.splice(e.currentTarget.dataset.index,1);
        this.flushCart(cart,selected);
      })
    })
  },
  handleChange(e){
    let cart = this.data.goodsList;
    let index = e.currentTarget.dataset.index;
    cart[index].selectNumber=e.detail.value;
    wx.request({
      url:"https://www.s1mpie.top:453/sxdj/shoppingCart?id="+cart[index].id+"&number="+e.detail.value,
      method:'post',
      header:{
        accessToken:this.data.accessToken
      },
      success:(result => {
        this.flushCart(cart,this.data.selectList);
      })
    })
  },
  handleRadio(e){
    let selected = this.data.selectList;
    let selectedNumber = this.data.selectNumber;
    if(selected[e.currentTarget.dataset.value]){
      selected[e.currentTarget.dataset.value]=false;
      selectedNumber--;
    }else{
      selected[e.currentTarget.dataset.value]=true;
      selectedNumber++;
    }
    this.setData({
      selectList:selected,
      selectNumber:selectedNumber
    })
    this.flushTotalPrice();
  },
  handleAllSelect(e){
    let selected = this.data.selectList;
    let selectedNumber = 0;
    let flag = false;
    if(selected.length !== this.data.selectNumber){
      flag=true;
      selectedNumber=selected.length;
    }
    selected.fill(flag);
    this.setData({
      selectList:selected,
      selectNumber:selectedNumber
    })
    this.flushTotalPrice();
  },
  submit(e){
    let orderList=[];
    let cart=this.data.goodsList;
    let selected=this.data.selectList;
    let length = this.data.goodsList.length;
    for (let i = length-1; i >=0; i--) {
      if(this.data.selectList[i]){
        orderList.push(this.data.goodsList[i]);
        cart.splice(i,1);
        selected.splice(i,1);
      }
    }
    wx.setStorage({
      key:"order",
      data:orderList,
      success:(res => {
        this.flushCart(cart,selected);
        wx.navigateTo({
          url:'/pages/order/pushOrder/pushOrder'
        })
      })
    })
  },
  flushCart(Cart,selected){
    this.setData({
      goodsList:Cart,
      selectList:selected
    })
  },
  flushTotalPrice(){
    let total=0;
    for (let i = 0; i < this.data.goodsList.length; i++) {
      if (this.data.selectList[i]){
        total += this.data.goodsList[i].selectNumber*this.data.goodsList[i].price
      }
    }
    this.setData({
      totalPrice:total
    })
  }
})