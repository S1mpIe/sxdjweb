const { $Toast } = require('../../../dist/base/index');
Page({
    data: {
        accessToken:'',
        selectAddress:{},
        selectAddressId:-1,
        pointAddress:'',
        pointPhone:'',
        receiver:'',
        receiverPhone:'',
        orderGoods:[],
        totalPrice:0,
    },
    onLoad: function (options) {
        this.setData({
            accessToken:wx.getStorageSync("accessToken"),
            orderGoods:wx.getStorageSync("order")
        })
        if(options.id !== undefined){
            this.setData({
                selectAddressId:options.id,
                pointAddress:options.address,
                pointPhone:options.pointPhone,
                receiver:options.receiver,
                receiverPhone:options.receiverPhone,
            })
        }
        this.flushTotalPrice();
    },
    changeReceive(e){
        wx.navigateTo({
            url:'/pages/order/addressSelect/addressSelect?id='+this.data.selectAddressId
        })
    },
    flushTotalPrice(){
        let goods = this.data.orderGoods;
        let total = 0;
        goods.forEach((item)=>{total =  ((item.price*100) * (item.selectNumber*100) + total * 10000)/10000})
        console.log(total)
        this.setData({
            totalPrice:total
        })
    },
    handleSubmit(){
        if (this.data.selectAddressId == -1){
            $Toast({
                content: '请选择你的收货信息',
                type: 'warning'
            });
        }else {
            var orderMap = new Map();
            let goods = this.data.orderGoods;
            goods.forEach((item)=>{
                orderMap.set(item.id,item.selectNumber);
            })
            let obj= Object.create(null);
            for (let[k,v] of orderMap) {
                obj[k] = v;
            }
            wx.request({
                url:'https://www.s1mpie.top:453/sxdj/order',
                method:'put',
                header:{
                    accessToken:this.data.accessToken
                },data:{
                    addressId:this.data.selectAddressId,
                    orderMap:obj
                },success:(result => {
                    $Toast({
                        content: '订单提交成功',
                        type: 'success'
                    });
                    Thread.sleep(1000)
                    wx.switchTab({
                        url:'/pages/shoppingCart/shoppingCart'
                    })
                })
            })
        }
    }
});