// pages/wallpaperdetail/index.js
const app = getApp()

Page({
  data: {
    hasmore:true,
    //是否授权登录
    hasshouquan:false
  },
  /**
 * 获取用户信息接口后的处理逻辑
 */
  getUserInfo: function (e) {
    var that=this;
    // 将获取的用户信息赋值给全局 userInfo 变量，再跳回之前页
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        hasshouquan:true
      })
    }
  },
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
   
    that.key=options.key;
    that.sort = options.sort;
    that.category = options.category;
    if (options.category == 'undefined' || options.category ==undefined){
      that.category='';

    }
    if (app.globalData.userInfo){
      that.setData({
        hasshouquan: true
      })
    }
    

    if (app.globalData.openid && app.globalData.openid != '') {

      that.addPreNum(options.key);
      that.loadpic(that.sort, that.category)
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.openidReadyCallback = openid => {
        if (openid != '') {

          that.addPreNum(options.key);
          that.loadpic(that.sort, that.category)
        }
      }
    }

    

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          wHeight:res.windowHeight,
          wHeightM: res.windowHeight+5
        })
      }
    })
    
  },
  loadpic: function (type, category,isclicklikebtn) {
    var that = this;
    wx.request({
      url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getlist.php',
      data: {
        paixu: type,
        category: category,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log("res")
        if (typeof (res.data) == 'string') {

          res.data = res.data.replace(/(^\s*)|(\s*$)/g, "");
          res.data = JSON.parse(res.data);
        }

        if (res.data.success) {
          if (isclicklikebtn){
           
            that.setData({
              wallpagerlist: res.data.items
             
            });

          }else{
            var current = 0;
            for (var ii = 0; ii < res.data.items.length; ii++) {
              if (res.data.items[ii].key == that.key) {
                current = ii;
                res.data.items[ii].show = true;
                if (ii != 0) {
                  res.data.items[ii - 1].show = true;
                }
                if (ii != res.data.items.length - 1) {
                  res.data.items[ii + 1].show = true;
                }
                break;
              }
            }
            that.setData({
              wallpagerlist: res.data.items,
              current: current,
              current_key: that.key
            });
            console.log(res.data.items)
          }
          
        }
      }
    })

  },
  touchstart: function (e) {
    var that = this;
    that.oclientY = e.changedTouches[0].clientY;
    that.oclientX = e.changedTouches[0].clientX;

  },
  slide: function (e) {

    var that = this;
    that.nclientY = e.changedTouches[0].clientY;
    that.nclientX = e.changedTouches[0].clientX;


    var dir =  (that.nclientX - that.oclientX);

    var items = that.data.wallpagerlist;
    //console.log(Math.abs(that.nclientX - that.oclientX))
    //if (Math.abs(that.nclientX -that.oclientX) < 80){
    var hasmore = true;
    that.setData({
      hasmore: hasmore
    })

    if (dir < -80) {

      if (that.data.current == (items.length - 1)) {
        hasmore = false;
      }
      that.setData({
        upindex: that.data.current + 1,
        up: true,
        down: false,
        hasmore: hasmore
      })
      for (var ii = 0; ii < items.length; ii++) {
        items[ii].show = false;
        if ((that.data.upindex) == ii) {
          items[ii].show = true;
          if (ii != 0) {
            items[ii - 1].show = true;
          }
          if (ii != (items.length - 1)) {
            items[ii + 1].show = true;
          }
          that.setData({
            wallpagerlist: items,
            current_title: items[ii].title,
            current_key: items[ii].key
          });
          that.addPreNum(items[ii].key);
          //that.setPre(app.globalData.openid, items[ii].id, that.data.userInfo.avatarUrl);
          //this.audioCtx.seek(0)
          //setTimeout(function () { that.audioCtx.play() }, 180)
          break;
        }
      }
    } else if (dir > 80) {
      if (that.data.current == 0) {
        hasmore = false;
        console.log(hasmore, that.data.current)

      }
      that.setData({
        downindex: that.data.current - 1,
        down: true,
        up: false,
        hasmore: hasmore

      })
      for (var ii = 0; ii < items.length; ii++) {
        items[ii].show = false;
      }
      for (var ii = 0; ii < items.length; ii++) {

        if ((that.data.downindex) == ii) {
          items[ii].show = true;
          if (ii != 0) {
            items[ii - 1].show = true;
          }
          if (ii != (items.length - 1)) {
            items[ii + 1].show = true;
          }
          that.setData({
            wallpagerlist: items,
            current_title: items[ii].title,
            current_key: items[ii].key
          });
          that.addPreNum(items[ii].key);
          //that.setPre(app.globalData.openid, items[ii].id, that.data.userInfo.avatarUrl);
          //this.audioCtx.seek(0)
          //setTimeout(function () { that.audioCtx.play() }, 180)

          break;
        }
      }
    }
    

    //}
    
  },
  animationend: function () {
    var that = this;
    if (that.data.up == true) {
      that.setData({
        current: that.data.current + 1
      })
    } else {
      that.setData({
        current: that.data.current - 1
      })
    }



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
  },
  addPreNum:function(key){
    var that=this;
    console.log(app.globalData.openid)
  wx.request({
        url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/addpre.php',
        data:{
          key:key,
          openid:app.globalData.openid,
          nickName:app.globalData.userInfo.nickName
        },
        success: function (res) {
          
          
        }
      })
  },
  addDownNum: function (key) {
    var that = this;
    wx.request({
      url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/addDownload.php',
      data: {
        key: key,
        openid: app.globalData.openid,
        nickName: app.globalData.userInfo.nickName
      },
      success: function (res) {


      }
    })
  },
  
  download_pic:function(e){
    var that=this;
    var pic=e.currentTarget.dataset.pic;
    
    wx.downloadFile({
      url: pic, //仅为示例，并非真实的资源
      success: function(res) {
       // console.log(res)

        if (wx.saveImageToPhotosAlbum) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res1) {
              // console.log(res1)


              that.addDownNum(that.data.current_key);
              wx.showToast({
                title: '已保存到系统相册',
                icon: 'success',
                duration: 2000
              })
            },
            fail(res1) {
              // console.log(res1, '/private/var/mobile/Media/DCIM')
            }
          })
        } else {


          wx.getSystemInfo({
            success: function (resSysInfo) {

              console.log(resSysInfo.system)
              if (resSysInfo.system.indexOf("Android") >= 0) {
                 wx.previewImage({
                  urls: [
                    pic
                  ]
                })

              }else{
                // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                wx.showModal({
                  title: '提示',
                  content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                })

              }

            }
          })


          
        }
       
      }
    })


    

    
   
  },
  //预览
  preview_pic:function(){
    var that=this;
    that.setData({
      hide:'show'
    })
  },
  //隐藏预览层
  hide_pic:function(){
    var that=this;
    that.setData({
      hide:''
    })
  },

  //喜欢人数
  likebtn_pic:function(e){
    var that=this;
    var islike=e.currentTarget.dataset.like;
      var url='';
      var islike_new=true;
      if (islike == 'p_false') {
        url ='https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/addLike.php';
        islike_new = true;

      } else {
        url = 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/cancelLike.php';
        islike_new = false;
      }
      wx.request({
        url: url,
        data: {
          key: that.data.current_key,
          openid: app.globalData.openid,
         // nickName: app.globalData.userInfo.nickName
        },
        success: function (res) {
          if (typeof (res.data) == 'string') {

            res.data = res.data.replace(/(^\s*)|(\s*$)/g, "");
            res.data = JSON.parse(res.data);
          }
          if (res.data.success) {

            var items = that.data.wallpagerlist;
            for (var ii = 0; ii < items.length; ii++) {
              if (that.data.current_key == items[ii].key) {
                items[ii].like_num = res.data.like_num;
                items[ii].islike = islike_new;
                that.setData({
                  wallpagerlist: items
                });
                break;
              }
            }

          }
        }
      })


    
  },

  onShareAppMessage() {
    return {
      title: '壁纸',
      desc: '壁纸',
      path: 'pages/wallpaperdetail/index?key='+that.key
    }
  }  
})