// pages/category/index.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var category=options.category;
    that.category = options.category;
    wx.setNavigationBarTitle({
      title: category
    })
    wx.request({
      url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getlist.php',
      data:{
        category:category
      },
      success: function (res) {
        if(typeof(res.data)=='string'){

          res.data=res.data.replace(/(^\s*)|(\s*$)/g, "");
          res.data=JSON.parse(res.data);
        }

        if(res.data.success){
          that.setData({
            wallpagerlist:res.data.items,
            hide:''
          });
        }
      }
    })
  },

  binkDetailpic:function(e){
    var that=this;
    var key=e.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../wallpaperdetail/index?category=' + that.category+'&key='+key
    })
  }, 
 
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})