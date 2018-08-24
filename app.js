//app.js
App({
  onLaunch: function () {
   var that=this;

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // 没有授权，重定向到 loading 启动页
         
        }
      }
    })

    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://h5.yunplus.com.cn/cases/weChatApplet/calendar/do/getOpenid.php',
            data: {

              js_code: res.code,
            },
            success: function (Lres) {
              that.globalData.openid = Lres.data.openid;

              if (that.openidReadyCallback) {
                that.openidReadyCallback(Lres.data.openid)
              }
            },
            fail: function (Lres) {

            }
          })
        }

      }
    })

  },
  
  globalData:{
    userInfo:null,
    openid:null
  }
})