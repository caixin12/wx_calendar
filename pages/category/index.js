// pages/category/index.js
var pageNum = 1,
  pageNum_arr = [1];
Page({
  data:{
    hasmore: false,
    isbottom: false,
    wallpagerlist: []
  },
  loadpic(){
    let that=this;
    console.log(pageNum, that.category)
    wx.request({
      url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getlist.php',
      data: {
        category: that.category,
        pageNum: pageNum
      },
      success: function (res) {
        if (typeof (res.data) == 'string') {

          res.data = res.data.replace(/(^\s*)|(\s*$)/g, "");
          res.data = JSON.parse(res.data);
        }

        if (res.data.success) {
          var wallpagerlist = that.data.wallpagerlist;
          for (var i = 0; i < res.data.items.length; i++) {
            wallpagerlist.push(res.data.items[i]);
          }

          that.setData({
            wallpagerlist: wallpagerlist,
            hasmore: res.data.hasmore,
            hide: ''

          });
          pageNum++;

        }
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var category=options.category;
    that.category = options.category;
    wx.setNavigationBarTitle({
      title: category
    })
    
    pageNum = 1;
    pageNum_arr = [1]
    that.setData({
      hasmore: false,
      isbottom: false,
      wallpagerlist: []
    })
    that.loadpic()


  },

  binkDetailpic:function(e){
    var that=this;
    var key=e.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../wallpaperdetail/index?category=' + that.category+'&key='+key
    })
  }, 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    var that = this;

    if (that.data.hasmore == true && pageNum_arr[pageNum_arr.length - 1] != pageNum && that.data.type != 'random') {

      pageNum_arr.push(pageNum)
      that.loadpic();
    }

    if (that.data.hasmore == false) {
      that.setData({
        isbottom: true
      })
      setTimeout(function () {
        that.setData({
          isbottom: false
        })
      }, 1700)
    }

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that=this;
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})