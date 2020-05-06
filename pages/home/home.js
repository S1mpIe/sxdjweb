// pages/home/home.js
Page({
  data:{
    accessToken:'',
    navigations:[],
    cateList:[{
      name:"新鲜果蔬",
      imageSrc:"../../images/icons/vegetables.jpg"
    },{
      name:"家禽肉类",
      imageSrc:"../../images/icons/duck.jpg"
    },{
      name:"农家特色",
      imageSrc:"../../images/icons/honey.jpg"
    }],
    recommendList:[]
  },
  onLoad(query) {
    const _ts = this;
    wx.login({
      success: function (e) {
        var code = e.code;
        console.log(code);
        wx.request({
          url: 'https://www.s1mpie.top:453/sxdj/login',
          data: {
            code: code
          },
          dataType: 'json',
          method: 'put',
          success: function (e) {
            var accessToken = e.data.accessToken;
            if (accessToken != null) {
              wx.setStorage({
                key: "accessToken",
                data: accessToken,
                success:(res=>{
                  _ts.setData({
                    accessToken:accessToken
                  })
                  wx.request({
                    url: "https://www.s1mpIe.top:453/sxdj/home/navigation",
                    method: "get",
                    header: {
                      "accessToken": accessToken
                    },
                    success: function (e) {
                      _ts.setData({
                        navigations: e.data.navigations
                      })
                    }
                  });
                  wx.request({
                    url: 'https://www.s1mpie.top:453/sxdj/home/recommend',
                    method: 'get',
                    header: {
                      accessToken:accessToken
                    },
                    success: (e) => {
                      _ts.setData({
                        recommendList: e.data
                      })
                    }
                  })
                })
              })
            }
          }
        })
      }
    })
  }
});