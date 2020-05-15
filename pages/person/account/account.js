Page({
    data: {
        accessToken:'',
        balance:0,
        details:[]
    },
    onLoad: function (options) {
        this.setData({
            accessToken:wx.getStorageSync("accessToken")
        })
    },
    onShow() {
        wx.request({
            url:'https://www.s1mpie.top:453/sxdj/account',
            header:{
                accessToken:this.data.accessToken
            },
            method:'get',
            success:(result => {
                let list = result.data.details;
                list.forEach((item)=>{
                    item.time=new Date(item.time).toLocaleString()
                })
                this.setData({
                    balance:result.data.account,
                    details:result.data.details
                })
            })
        })
    }
});