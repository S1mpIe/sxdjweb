Page({
    data: {
        cate:'',
        accessToken:'',
        isFocus: false,
        inputValue:'',
        orderList:[],
        showList:[],
        current:0,
        stepOne:'',
        stepTwo:'',
        stepThree:''
    },
    onLoad: function (options) {
        this.setData({
            accessToken:wx.getStorageSync("accessToken"),
            cate:options.value
        });
        let one,two,three,current;
        switch (options.value) {
            case '待发货':{
                current = 0;
                one = 'process'
                two = 'wait'
                three = 'wait'
            }
            break;
            case '待提货':{
                current = 1;
                one = 'success'
                two = 'process'
                three = 'wait'
            }
            break;
            case '%':{
                current = 2;
                one = 'success'
                two = 'success'
                three = 'success'
            }
            break;
        }
        this.setData({
            current:current,
            stepOne:one,
            stepTwo:two,
            stepThree:three
        })
    },
    onShow() {
        wx.request({
            url:'https://www.s1mpie.top:453/sxdj/order?status=' + this.data.cate,
            header:{
                accessToken:this.data.accessToken
            },
            method:'get',
            success:(result => {
                let list = result.data.orders;
                list.forEach((item)=>{
                    let date = new Date(item.putTime);
                    item.putTime=date.toLocaleString()
                })
                this.setData({
                    orderList: list,
                    showList:list
                })
            })
        })
    },
    inputValue(e){
        console.log(e)
    },
    loseFocus(e){
        let list = [];
        if (e.detail.value != '') {
            let orders = this.data.orderList
            orders.forEach((item) => {
                item.goods.forEach((iitem) => {
                    if (iitem.name.indexOf(e.detail.value) >= 0) {
                        console.log(item)
                        list.push(item);
                        return false;
                    }
                })
            })
            console.log(list)
        }else {
            list = this.data.orderList
        }
        this.setData({
            showList:list
        })
    },
    formatTime(){
        let list = this.data.goodsList;

        list.forEach((item)=>{
            let date = new Date(item.putTime);
            item.putTime=date.toLocaleString();
        })
        console.log(list);
    }
});