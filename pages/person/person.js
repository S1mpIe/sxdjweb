Page({
  data: {
    userInfo: {},
    accessToken: ''
  },
  onLoad(query) {
    this.setData({
      accessToken: wx.getStorageSync("accessToken")
    })
  },
  onShow() {
    wx.getUserInfo({
      lang: 'zh_CN',
      success: (result => {
        this.setData({
          userInfo: result.userInfo
        })
      })
    })
  },
  showOrders(e) {
    wx.navigateTo({
      url: '/pages/order/orders/orders?value=' + e.currentTarget.dataset.value
    })
  },
  navigate(e){
    wx.navigateTo({
      url: '/pages/person/' + e.currentTarget.dataset.goal +'/' + e.currentTarget.dataset.goal
    })
  },
})