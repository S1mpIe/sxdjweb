const { $Toast } = require('../../../dist/base/index');
Page({
    data: {
        accessToken:'',
        selectId:-1,
        selectIndex:-1,
        addresses:[]
    },
    onLoad: function (options) {
        this.setData({
            accessToken:wx.getStorageSync("accessToken"),
            selectId:options.id
        });
    },
    onShow() {
        wx.request({
            url:'https://www.s1mpie.top:453/sxdj/shoppingAddress',
            method:'get',
            header:{
                accessToken:this.data.accessToken
            },success:(res=>{
                console.log(res)
                this.setData({
                    addresses:res.data.addresses
                })
            })
        })
    },
    selectChange(e){
        this.setData({
            selectId:e.currentTarget.dataset.id,
            selectIndex:e.currentTarget.dataset.index
        })
    },
    handleAdd(e){
        wx.navigateTo({
            url:'/pages/order/addressSelect/addAddress/addAddress'
        })
    },
    handleSubmit(e){
        if (this.data.selectId == -1){
            $Toast({
                content: '请选择你的收货信息',
                type: 'warning'
            });
        }else{
            $Toast({
                content: '设置成功',
                type: 'success'
            });
            wx.redirectTo({
                url:'/pages/order/pushOrder/pushOrder?id='+this.data.selectId
                +'&address='+this.data.addresses[this.data.selectIndex].point.address+
                    '&pointPhone=' + this.data.addresses[this.data.selectIndex].point.phoneNumber +
                    '&receiver=' + this.data.addresses[this.data.selectIndex].name +
                    '&receiverPhone=' + this.data.addresses[this.data.selectIndex].phoneNumber
            })
        }
    }
});