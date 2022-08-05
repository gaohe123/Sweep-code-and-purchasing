// components/Button/index.js
import ProductionModel from "../../model/production";
import {navigateTo} from "../../utils/wxApi";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type : {
      type : String,
      value : "circle"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async handleQrcode(){
      //获取到所扫码商品的条形码
      let {result} = await this.scanCodePromise()
      //如果所扫码商品的条形码不存在或者有问题我门则不继续往下执行
      if(!result) return;
      //将获取到的商品条形码传递给父组件
      this.triggerEvent("GetQrcode",{qrcode : result})
    },
    /**
     * 将扫码方法进行promise化
     * @returns {Promise<unknown>}
     */
    scanCodePromise(){
      return new Promise((resolve, reject)=>{
        wx.scanCode({
          success : (res)=> {
            resolve(res)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    },
  }
})
