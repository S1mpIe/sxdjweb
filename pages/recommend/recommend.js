// pages/recommend/recommend.js
Page({
  data: {
    articleList:[]
  },

  onLoad: function (options) {
    wx.getStorage({
      key:"accessToken",
      success:(res)=>{
        wx.request({
          url:"http://www.s1mpie.top:8080/sxdj/articles",
          method:'get',
          header:{
            accessToken:res.data
          },
          success:(result => {
            console.log(result);
            this.setData({
              articleList:result.data.articles
            })
          })
        })
      }
    })
  },
  bindToArticle(e){
    console.log(e);
    wx.navigateTo({
      url:"/pages/article/index?articleId="+e.currentTarget.dataset.id
    })
  }
})