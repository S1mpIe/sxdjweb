//获取应用实例
const app = getApp();
Page({
	data: {
		article: {}
	},
	onLoad: function (e) {
    var articleId=e.articleId;
    wx.getStorage({
        key:"accessToken",
        success:(result => {
            wx.request({
                url:"https://www.s1mpie.top:453/sxdj/article",
                method:'get',
                header:{
                    accessToken:result.data
                },
                data:{
                    articleId:articleId
                },
                success:(e=>{
                    console.log(e)
                    wx.request({
                        url: e.data.article.mdUrl,
                        method:'get',
                        success: (res) => {
                            let result = app.towxml(res.data, 'markdown', {
                                theme: 'light',                   // 主题，默认`light`
                                events: {                    // 为元素绑定的事件方法
                                    tap: (e) => {
                                        console.log('tap', e);
                                    }
                                }
                            });

                            // 更新解析数据
                            this.setData({
                                article: result,
                            });
                        }
                    })
                })
            })
        })
    })

	}
})