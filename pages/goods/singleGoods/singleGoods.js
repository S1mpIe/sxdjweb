Page({
    data: {
        accessToken:'',
        goods:{},
        goodsId:0,
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            goodsId:parseInt(options.id)
        })
        wx.getStorage({
            key:"accessToken",
            success:(res)=>{
                this.setData({
                    accessToken:res.data
                })
                wx.request({
                    url:"https://www.s1mpie.top:453/sxdj/goods",
                    method:'get',
                    header:{
                        "accessToken":res.data
                    },
                    data:{
                        'goodsId':options.id
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
    changeSelectNumber(e) {
        wx.request({
            url: "https://www.s1mpie.top:453/sxdj/shoppingCart?id=" + this.data.goodsId + "&number=" + e.detail.value,
            method: 'post',
            header: {
                'content-type': 'application/json',
                accessToken: this.data.accessToken
            }, dataType: 'json',
            data: {
                id: this.data.goodsId,
                number: this.data.selectNumber
            }, success: (res => {
                console.log(res)
                let temp = this.data.goods;
                temp.selectNumber = e.detail.value
                if (res.data.status == 'success') {
                    this.setData({
                        goods:temp
                    })
                }
            })
        })
    }
});