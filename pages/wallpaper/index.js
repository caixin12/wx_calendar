// pages/wallpaper/index.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadpic('new','');
    this.setData({
      type:'new',
      category:'',
      menu_zt:'open'
    })
    wx.setNavigationBarTitle({
      title: '壁纸'
    })
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
    if(that.data.type=='hot'){
      that.loadpic('hot',that.data.category)
    }
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
    console.log(e.currentTarget,that.data.category)
    var type=e.currentTarget.dataset.key;
    that.setData({
      type
    })
    that.setData({
      hide:'hide'
    });
    if(type=='hot'){
      that.loadpic('hot',that.data.category)
    } else if (type == 'new'){
      that.loadpic('new',that.data.category)
    }else{
      that.loadpic('random', that.data.category)

    }
    
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
  loadpic:function(type,category){
    var that=this;
    wx.request({
        url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getlist.php',
        data:{
          paixu:type,
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
      url: '../wallpaperdetail/index?sort=' + that.data.type+'&key='+key
    })
  },
  onShareAppMessage() {
    return {
      title: '壁纸',
      desc: '壁纸',
      path: 'pages/wallpaper/index'
    }
  }
})