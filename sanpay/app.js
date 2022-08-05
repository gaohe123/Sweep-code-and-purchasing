// app.js
import PayModel from "./model/pay"
import storage from "./utils/storage";
App({
  async onLaunch() {
    //调用获取code码方法
    let code = await this.getCode()

    if(!code) return

    //通过code码获取到openid以及用户相关信息
    let res = await PayModel.getOpenid(code)

    if(!res && !res.userinfo) return

    //将获取到的openid以及用户信息存储到本地
    storage.set("userinfo",res.userinfo)
  },
  //获取code码
  getCode(){
    return new Promise((resolve, reject)=>{
      wx.login({
        success : (res)=>{
          resolve(res.code)
        },
        fail : (err)=> {
          reject(err)
        }
      })
    })
  },
  globalData: {
    userInfo: null
  }
})
