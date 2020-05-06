Page({
    data: {
        goods:{}
    },
    onLoad: function (options) {
        this.setData({
            goodsId:parseInt(options.id)
        })
        wx.getStorage({
            key:"accessToken",
            success:(res)=>{
                console.log(this.goodsId)
                wx.request({
                    url:"https://www.s1mpie.top:453/sxdj/goods",
                    method:'get',
                    header:{
                        "accessToken":res.data
                    },
                    data:{
                        'goodsId':this.data.goodsId
                    },
                    success:(e)=>{
                        console.log(e);
                        this.setData({
                            goods:e.data.goods
                        })
                    }
                })
            }
        })
    },
    changeSelectNumber(e){
        wx.getStorage({
            key:"accessToken",
            success:(result => {
                wx.request({
                    url:"https://www.s1mpie.top:453/sxdj/shoppingCart?id="+this.data.goodsId+"&number="+e.detail.value,
                    method:'post',
                    header:{
                        'content-type': 'application/json',
                        accessToken:result.data
                    },dataType:'json',
                    data:{
                        id:this.data.goodsId,
                        number:this.data.selectNumber
                    },success:(res=>{
                        console.log(result.data)
                        if (res.data.status === 'success'){
                            this.setData({
                                selectNumber:e.detail.value
                            })
                        }
                    })
                })
            })
        })
    }
});