// pages/wallpaperdetail/index.js
//app.js
var app =({

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {

          console.log(res)
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
  data: {
   
    },
  
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '壁纸'
    })
    that.key=options.key;
    that.sort = options.sort;
    that.category = options.category;
    if (options.category == 'undefined' || options.category ==undefined){
      that.category='';

    }

    app.getUserInfo(function (userInfo) {
     // that.getDetailPic(options.key);
      that.addPreNum(options.key);

      that.loadpic(that.sort, that.category)

    })
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
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
                break;
              }
            }
            that.setData({
              wallpagerlist: res.data.items,
              current: current,
              current_key: that.key
            });

          }
          
        }
      }
    })

  },
  slide:function(e){
    var that=this;
    var items = that.data.wallpagerlist;
    for (var ii = 0; ii < items.length;ii++){
      if (e.detail.current==ii){
        that.setData({
         
          current_key: items[ii].key
        });
        that.addPreNum(items[ii].key);
        break;
      }
    }
    that.setData({
      hide: '',
      isclickLike: false,
    });
    
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
  getDetailPic:function(key){
    var that=this;
        console.log("sdf",app)
        wx.request({
        url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getoneWallpaper.php',
        data:{
          key:key,
          openid:app.globalData.openid
        },
        success: function (res) {
          console.log(res)
           //var r = /\{(.+?)\}/g;
          // console.log(res.data.match(r)[0])
          // console.log(JSON.parse(res.data.match(r)[0]))
          if(typeof(res.data)=='string'){

            res.data=res.data.replace(/(^\s*)|(\s*$)/g, "");
            res.data=JSON.parse(res.data);
          } 

          if(res.data.success){
            that.setData({
                key:res.data.items.key,
                pic:res.data.items.pic,
                bigpic:res.data.items.bigpic,
                like_num:res.data.items.like_num,
                islike:res.data.items.islike,
                down_num: res.data.items.down_num,
                pre_num: res.data.items.pre_num,
                
                
            });
          }
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


              that.addDownNum(that.key);
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
    app.getUserInfo(function (userInfo) {
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
          nickName: app.globalData.userInfo.nickName
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