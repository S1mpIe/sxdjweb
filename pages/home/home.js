// pages/home/home.js
Page({
  data:{
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
    wx.getStorage({
      key: "accessToken",
      success: function (res) {
        wx.request({
          url: "http://www.s1mpIe.top:8080/sxdj/home/navigation",
          method: "get",
          header: {
            "accessToken": res.data
          },
          success: function (e) {
            _ts.setData({
              navigations: e.data.navigations
            })
          }
        });
        wx.request({
          url: 'http://www.s1mpie.top:8080/sxdj/home/recommend',
          method:'get',
          header:{
            accessToken:res.data
          },
          success:(e)=>{
            console.log(e);
            _ts.setData({
              recommendList:e.data
            })
          }
        })
      }
    });
  }
});