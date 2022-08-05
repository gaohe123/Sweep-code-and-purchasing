// pages/shopping/shopping.js
import ProductionModel from "../../model/production";
import {navigateTo} from "../../utils/wxApi"
import storage from "../../utils/storage";
import carts from "../../common/carts";
Page({
  /**
   * 点击按钮开启扫描条形码
   */
  getQrcode : carts.getQrcode,
  /**
   * 将获取到的商品数据存储到本地
   * @param data
   */
  addCart : carts.addCart,
  /**
   * 要添加的商品信息 在 所有的商品信息 里面是否存在  存在 true 不存在false
   * @param data
   * @param carts
   */
  hasProduction : carts.hasProduction,

  /**
   * 页面的初始数据
   */
  data: {
    avatar : [
      {
        id : 1,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020t2vrszZ5ib1586332927.jpg?x-oss-process=image/resize,w_1920,h_575"
      },
      {
        id : 2,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020lLJK0jy89y1586333534.jpg?x-oss-process=image/resize,w_1920,h_575"
      },
      {
        id : 3,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020d4n2XkWbQ41586332943.jpg?x-oss-process=image/resize,w_1920,h_575"
      }
    ]
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})