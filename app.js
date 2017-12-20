//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          
          console.log(res)
          if(res.code){
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid:'wx1056662f250119da',
                secret:'205c9da330a01252016383c8b58c290d',
                js_code: res.code,
                grant_type:'authorization_code'
              },
              success: function (Lres) {
                
                that.globalData.openid = Lres.data.openid;
                wx.getUserInfo({
                  success: function (Ures) {
                    
                     that.globalData.userInfo = Ures.userInfo
                     typeof cb == "function" && cb(that.globalData.openid,that.globalData.userInfo)
                   }
                })
               // that.globalData.userInfo = res.data.userInfo;
               // typeof cb == "function" && cb(that.globalData.openid,that.globalData.userInfo)
              },
              fail:function(Lres){}
            })
          }
          //wx.getUserInfo({
          //  success: function (res) {
           //   that.globalData.userInfo = res.userInfo
           //   typeof cb == "function" && cb(that.globalData.userInfo)
           // }
         // })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    openid:null
  }
})