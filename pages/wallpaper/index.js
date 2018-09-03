// pages/wallpaper/index.js
var pageNum = 1,
  pageNum_arr = [1];
Page({
  data:{
    type: 'new',
    category: '',
    menu_zt: 'open',
    hasmore: false,
    isbottom: false,
    wallpagerlist: [],
    floorstatus:false
  },
  onLoad:function(options){
    pageNum = 1;
    pageNum_arr = [1];
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      type:'new',
      category:'',
      menu_zt:'open',
      hasmore: false,
      isbottom: false,
      wallpagerlist:[]
    })
    wx.setNavigationBarTitle({
      title: '壁纸'
    })
    this.loadpic();

  },
  onPullDownRefresh: function(){
     var that=this;
    wx.stopPullDownRefresh()
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    var that=this;
     
    //this.loadpic();

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  
  bindCTab:function(e){
    var that=this;
    var category=e.currentTarget.dataset.category;
    wx.navigateTo({
      url: '../category/index?category='+category
    })
  },
  bindTab:function(e){
    var that=this;
    var type=e.currentTarget.dataset.key;
    
    pageNum=1;
    pageNum_arr = [1]
    that.setData({
      type:type,
      hasmore: false,
      isbottom: false,
      wallpagerlist: [],
      hide: 'hide'

    })
  
    that.loadpic()

    
  },
  bindMenu:function(){
    var that=this;
    var zt=that.data.menu_zt;
    console.log(zt)
    if(zt=='open'){
      that.setData({
        menu_zt:'close'
      });
    }else{
      that.setData({
        menu_zt:'open'
      });
    }
  },
  loadpic: function (){
    var that=this;
    wx.request({
        url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getlistNew.php',
        data:{
          paixu: that.data.type,
          category: that.data.category,
          pageNum: pageNum
        },
        success: function (res) {
          if(typeof(res.data)=='string'){

            res.data=res.data.replace(/(^\s*)|(\s*$)/g, "");
            res.data=JSON.parse(res.data);
          }

          if(res.data.success){

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
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function (e) {
    var that = this;

    if (that.data.hasmore == true && pageNum_arr[pageNum_arr.length - 1] != pageNum && that.data.type !='random') {

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
  binkDetailpic:function(e){
    var that=this;
    var key=e.currentTarget.dataset.key;
   

    wx.navigateTo({
      url: '../wallpaperdetail/index?sort=' + that.data.type+'&key='+key
    })
  },
  onShareAppMessage() {
    return {
      title: '壁纸',
      desc: '壁纸',
      path: 'pages/wallpaper/index'
    }
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 30) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
})