const chooseLocation = requirePlugin('chooseLocation');
const { $Toast } = require('../../../../dist/base/index');
Page({
    data: {
        accessToken:'',
        isSelectMap:false,
        location:{}
    },
    onLoad: function (options) {
        this.setData({
            accessToken:wx.getStorageSync("accessToken")
        })
    },
    onShow() {
        const location = chooseLocation.getLocation();
        if (location != null){
            this.setData({
                location:location,
                isSelectMap:true
            })
        }
    },
    selectInMap(){
        const key = 'OGTBZ-APIK4-62VUR-XLI7V-KVHWH-B4B5F'; //使用在腾讯位置服务申请的key
        const referer = '即鲜而食'; //调用插件的app的名称
        const location = JSON.stringify({
            latitude:28.23,
            longitude:112.93,
        });
        const category = '生活服务,娱乐休闲';
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
        });
    },
    apply(e){
        console.log(e);
        let data = e.detail.value;
        console.log(Object.keys(this.data.location).length === 0)
        if(data.owner == ''
            || data.phoneNumber == ''
            || data.idNumber == ''
            || data.name == ''
            || data.area == ''
            || Object.keys(this.data.location).length === 0){

            $Toast({
                content: '您有信息填写错误或未填',
                type: 'error'
            })
        }else {
                wx.request({
                    url:'https://www.s1mpie.top:453/sxdj/extract',
                    header:{
                        accessToken:this.data.accessToken
                    },
                    method:'put',
                    data:{
                        owner:data.owner,
                        phoneNumber:data.phoneNumber,
                        idNumber:data.idNumber,
                        name:data.name,
                        area:data.area,
                        address:data.address,
                        latitude:this.data.location.latitude,
                        longitude:this.data.location.longitude,
                        address:this.data.location.address
                    },
                    success:(result => {
                        if (result.data.status == 'success'){
                            $Toast({
                                content: '申请成功',
                                type: 'success'
                            })
                        }else {
                            $Toast({
                                content: '申请失败',
                                type: 'error'
                            })
                        }
                        wx.redirectTo({
                            url:'/pages/person/extract/extract'
                        })
                    })
                })
        };
    }
});