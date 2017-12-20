// pages/mypaper/index.js
var app = ({
  
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {

          console.log("sdfsdfds",res)
          if (res.code) {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid: 'wx1056662f250119da',
                secret: '205c9da330a01252016383c8b58c290d',
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              success: function (Lres) {

                that.globalData.openid = Lres.data.openid;
                wx.getUserInfo({
                  success: function (Ures) {

                    that.globalData.userInfo = Ures.userInfo
                    typeof cb == "function" && cb(that.globalData.openid, that.globalData.userInfo)
                  }
                })
                // that.globalData.userInfo = res.data.userInfo;
                // typeof cb == "function" && cb(that.globalData.openid,that.globalData.userInfo)
              },
              fail: function (Lres) { }
            })
          }

        }
      })
    }
  },
  globalData: {
    userInfo: null,
    openid: null
  }
})

//var app = getApp();
Page({
  data:{
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    wx.setNavigationBarTitle({
      title: '我的'
    })
    console.log(app)
    app.getUserInfo(function (userInfo) {

    that.setData({
      logo:app.globalData.userInfo.avatarUrl,
      nickName:app.globalData.userInfo.nickName,
      type:'pre',
      isshowmask:false

    })
    that.getNum();
    that.loadpic('pre')
    })
  },

  //取消点赞
  cancellike: function (e) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      
      wx.request({
        url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/cancelLike.php',
        data: {
          key: e.currentTarget.dataset.key,
          openid: app.globalData.openid,
          nickName: app.globalData.userInfo.nickName
        },
        success: function (res) {
          if (typeof (res.data) == 'string') {

            res.data = res.data.replace(/(^\s*)|(\s*$)/g, "");
            res.data = JSON.parse(res.data);
          }
          if (res.data.success) {
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              duration: 1500
            })
            that.getNum();
            that.loadpic('like');
            

          }
        }
      })
    })



  },


  //清空浏览记录
  clearjl:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要清空浏览记录吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/updataListMypre.php',
            data: {
              openid: app.globalData.openid
            },
            success: function (res) {
              if (typeof (res.data) == 'string') {

                res.data = res.data.replace(/(^\s*)|(\s*$)/g, "");
                res.data = JSON.parse(res.data);
              }

              if (res.data.success) {
                that.getNum();
                that.loadpic('pre');
                that.setData({
                  isshowmask: false
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            isshowmask: false
          })
        }
      }
    })
    

  },

  //隐藏弹框
  closetk: function () {
    var that = this;
    that.setData({
      isshowmask: false
    })
  },

  //显示弹框
  opentk:function(){
    var that=this;
    that.setData({
      isshowmask:true
    })
  },


   onPullDownRefresh: function(){
     var that=this;
     that.getNum();
     that.loadpic('pre')

    wx.stopPullDownRefresh()
  },
  getNum:function(){
    var that=this;
    wx.request({
        url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getlistMyNum.php',
        data:{
          openid:app.globalData.openid
        },
        success: function (res) {
          if(typeof(res.data)=='string'){

            res.data=res.data.replace(/(^\s*)|(\s*$)/g, "");
            res.data=JSON.parse(res.data);
          }

          if(res.data.success){
            that.setData({
              like_num:res.data.likeNum,
              pre_num:res.data.preNum
            });
          }
        }
      })
  },
  bindTab:function(e){
    var that=this;
    console.log(e.currentTarget)
    var type=e.currentTarget.dataset.key;
    that.setData({
      type
    })
    that.setData({
      hide:'hide'
    });
    if(type=='like'){
      
      that.loadpic('like')
    }else{
      that.loadpic('pre')
    }
    

  },
  loadpic:function(type){
    var that=this;
    wx.request({
        url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getlistMy.php',
        data:{
          like:type,
          openid:app.globalData.openid
        },
        success: function (res) {
          if(typeof(res.data)=='string'){

            res.data=res.data.replace(/(^\s*)|(\s*$)/g, "");
            res.data=JSON.parse(res.data);
          }

            that.setData({
              wallpagerlist: res.data.items,
              hide: ''
            });
        
        }
      })
    
  },

  binkDetailpic:function(e){
    var that=this;
    var key=e.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../wallpaperdetail/index?key='+key
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that=this;
    var type=that.data.type;
    that.getNum();

    if(type=='like'){
      
      that.loadpic('like')
    }else{
      that.loadpic('pre')
    }
   


  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})