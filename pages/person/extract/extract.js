
Page({
  data:{
    accessToken:'',
    isApply:false,
    point:{},
    orders:[],
    noSendOrders:[],
    noReceiveOrders:[],
    overOrders:[],
    showOrders:[],
    current:'tab1',
    visible: false,
    receiveId:-1,
    receiveIndex:-1
  },
  onLoad(query) {
    this.setData({
      accessToken:wx.getStorageSync("accessToken")
    })
  },
  onShow() {
    wx.request({
      url:'https://www.s1mpie.top:453/sxdj/extract',
      method:'get',
      header:{
        accessToken:this.data.accessToken
      },
      success:(result => {
        console.log(result)
        console.log(Object.keys(result.data.point).length > 0)
        if (Object.keys(result.data.point).length > 0){
          let send = [];
          let receive = [];
          let over = [];

          result.data.orders.forEach((item)=>{
            if (item.status == '待发货'){
              send.push(item)
            }else if(item.status == '待提货'){
              receive.push(item)
            }else {
              over.push(item)
            }
          })
          this.setData({
            point:result.data.point,
            orders:result.data.orders,
            isApply:true,
            noSendOrders:send,
            noReceiveOrders:receive,
            overOrders:over,
            showOrders:send
          })
        }
      })
    })
  },
  handleApply(e){
    wx.navigateTo({url:'/pages/person/extract/applyNewExtract/applyNewExtract'})
  },
  handleChange ({ detail }) {
    if (detail.key == 'tab1'){
      this.setData({showOrders:this.data.noSendOrders})
    }else if(detail.key == 'tab2'){
      this.setData({showOrders:this.data.noReceiveOrders})
    }else{
      this.setData({showOrders:this.data.overOrders})
    }
    this.setData({
      current: detail.key
    });
  },
  handleConfirm(e){
    wx.request({
      url:'https://www.s1mpie.top:453/sxdj/extract/orders?orderId='+this.data.receiveId,
      method:'post',
      header:{
        accessToken:this.data.accessToken
      },success:(result => {
        if (result.data.status == 'success'){
          let mid = this.data.noReceiveOrders;
          let midS = this.data.overOrders;
          midS.push(mid[this.data.receiveIndex]);
          mid.splice(this.data.receiveIndex,1);
          this.setData({
            visible:false,
            noReceiveOrders:mid,
            showOrders:mid,
            overOrders:midS
          })
        }
      })
    })
  },
  handleShow(e){
    console.log(e)
    this.setData({
      visible:true,
      receiveId:e.currentTarget.dataset.id,
      receiveIndex:e.currentTarget.dataset.index
    })
  },
  handleClose(){
    this.setData({
      visible:false
    })
  }
})