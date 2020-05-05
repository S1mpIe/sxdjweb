Page({

  data: {
    accessToken:'',
    goodsList:[],
    searchText:'',
    hideSearch:false
  },

  onLoad(query) {
    console.log(query);
    wx.getStorage({
      key:"accessToken",
      success:(res)=>{
        switch (query.cate) {
          case 'cate':{
            wx.request({
              url:"http://www.s1mpie.top:8080/sxdj/home/categoryGoods",
              dataType:"json",
              header:{
                accessToken:res.data
              },
              data:{
                category:query.cateName
              },
              method:'get',
              success:(e)=>{
                this.setData({
                  goodsList:e.data,
                  hideSearch:true
                })
              }
            })
          }
          break;
          case 'recommend':{
            wx.request({
              url:"http://www.s1mpie.top:8080/sxdj/home/recommendGoods",
              dataType:"json",
              header:{
                accessToken:res.data
              },
              data:{
                recommendId:query.id
              },
              method:'get',
              success:(e)=>{
                this.setData({
                  goodsList:e.data,
                  hideSearch:true
                })
              }
            })
          }
        }
      }
    })
  },
  bindToSingleGoods(e){
    wx.navigateTo({
      url:"/pages/goods/singleGoods/singleGoods?&id="+e.currentTarget.dataset.id
    })
  }
})