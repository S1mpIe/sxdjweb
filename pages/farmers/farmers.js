
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
          url:"https://www.s1mpie.top:453/sxdj/home/farmer",
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
    let gId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url:"/pages/farmers/farmer/farmer?id=" + gId
    })
  }
})