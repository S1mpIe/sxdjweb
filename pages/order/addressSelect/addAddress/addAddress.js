const chooseLocation = requirePlugin('chooseLocation');
const { $Toast } = require('../../../../dist/base/index');
Page({
    data: {
        extractPoints:[],
        receiver:'',
        receiverPhone:'',
        selectPointId:-1,
        selectPointIndex:-1,
        accessToken:'',
        latitude:28.23,
        longitude:112.93,
        isSelected:false,
        isSelectLocation:false,
    },
    onLoad: function (options) {
        this.setData({
            accessToken:wx.getStorageSync("accessToken")
        })
    },
    onShow() {
        if(this.data.selectPointId == -1){
            const location = chooseLocation.getLocation();
            console.log(location)
            if (location!=null){
                wx.request({
                    url:'https://www.s1mpie.top:453/sxdj/extract/near?latitude='+location.latitude+'&longitude='+location.longitude,
                    method:'get',
                    header:{
                        accessToken:this.data.accessToken
                    },success:(res => {
                        this.setData({
                            extractPoints:res.data.points,
                            isSelectLocation:true
                        })
                    })
                })
            }
        }
    },
    toMap(e){
        const key = 'OGTBZ-APIK4-62VUR-XLI7V-KVHWH-B4B5F'; //使用在腾讯位置服务申请的key
        const referer = '即鲜而食'; //调用插件的app的名称
        const location = JSON.stringify({
            latitude: this.data.latitude,
            longitude: this.data.longitude
        });
        const category = '生活服务,娱乐休闲';
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
        });
        this.setData({
            isSelected:false
        })
    },
    selectAddress(e){
        console.log(e)
        this.setData({
            selectPointId:e.currentTarget.dataset.id,
            selectPointIndex:e.currentTarget.dataset.index,
            isSelected:true
        })
    },
    handleChangePhone(e){
        this.setData({
            receiverPhone:e.detail.detail.value
        })
    },
    handleChangeReceiver(e){
        this.setData({
            receiver:e.detail.detail.value
        })
    },
    handleSubmit(e){
        if(this.data.receiver == null || this.data.receiverPhone == null){
            $Toast({
                content: '请填写收件人和电话号码',
                type: 'warning'
            });
        }else {
            wx.request({
                url:'https://www.s1mpie.top:453/sxdj/shoppingAddress?name=' + this.data.receiver + '&pointId=' + this.data.selectPointId + '&phoneNumber=' + this.data.receiverPhone,
                method:'put',
                header:{
                    accessToken:this.data.accessToken
                },success:(result => {
                    if (result.data.status == "success"){
                        $Toast({
                            content: '提交成功',
                            type: 'warning'
                        });
                        wx.redirectTo({url:'/pages/order/addressSelect/addressSelect'})
                    }else {
                        $Toast({
                            content: '提交失败',
                            type: 'warning'
                        });
                    }
                })
            })
        }
    }
});