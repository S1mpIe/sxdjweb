
Page({
  data:{
    farmerList:[]
  },

  onLoad(query) {
    const _ts = this;
    wx.getStorage({
      key:"accessToken",
      success:(res) =>{
        wx.request({
          url:"http://www.s1mpie.top:8080/sxdj/home/farmer",
          method:"get",
          header: {
            accessToken: res.data
          },
          success:(result)=>{
            _ts.setData({
              farmerList:result.data
            })
          }
        })
      }
    })
  },
  bindToFarmer(e){
    console.log(e);
    var gId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url:"/pages/farmers/farmer/farmer?id=" + gId
    })
  }
})