//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  login: function(){
    wx.login({
      success:function (e) {
        var code=e.code;
        console.log(code);
        wx.request({
          url:'http://www.s1mpie.top:8080/sxdj/login',
          data:{
            code:code
          },
          dataType:'json',
          method:'put',
          success:function (e) {
            var accessToken=e.data.accessToken;
            if(accessToken != null){
              wx.setStorage({
                key:"accessToken",
                data:accessToken,
                success:function (e) {
                  wx.switchTab({
                    url:"../home/home"
                  })
                }
              })
            }else {
              wx.navigateTo({
                url:"../register/register"
              })
            }
          }
        })
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
});