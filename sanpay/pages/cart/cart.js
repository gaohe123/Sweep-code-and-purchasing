// pages/cart/cart.js
import storage from "../../utils/storage";
import carts from "../../common/carts";
import {navigateTo} from "../../utils/wxApi"
Page({
  getQrcode : carts.getQrcode,
  addCart : carts.addCart,
  hasProduction : carts.hasProduction,

  /**
   * 跳转到订单页面
   */
  doOrder(){
    navigateTo("/pages/order/order")
  },

  /**
   * 实现商品数量的增加
   * @param event
   */
  increment(event){
    let {idx,cartData} = this.hasCartData(event)

    //让当前所点击对应的下标的数据的num + 1  [ {},{}]
    cartData[idx].num +=1;

    this.setData({
      carts : cartData
    })

    storage.set("carts",cartData)

    this.totalResult(cartData)
  },

  /**
   * 实现商品数量的减少
   * @param event
   */
  decrement(event){
    let {idx,cartData} = this.hasCartData(event)
    console.log(idx,cartData)
    if(cartData[idx].num <= 1){
      wx.showModal({
        title: '提示',
        content: '您确定要删除这个商品吗？',
        success : (res) =>{
          if (res.confirm) {
            cartData.splice(idx,1)
            console.log(cartData)
            this.setData({
              carts : cartData
            })
            storage.set("carts",cartData)
            this.totalResult(cartData)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      cartData[idx].num -=1;
    }
    this.setData({
      carts : cartData
    })

    storage.set("carts",cartData)
    this.totalResult(cartData)
  },

  /**
   * 获取当前点击元素的下标以及购物车的所有数据
   * @param event
   */
  hasCartData(event){
    //先获取当前所点击元素的下标
    let idx = event.currentTarget.dataset.index

    //获取到购物车的所有数据
    let cartData = this.data.carts

    //如果购物车的数据不存在,则不继续往下执行
    if(!cartData) return;

    return {idx,cartData}
  },

  /**
   * 页面的初始数据
   */
  data: {
    carts : [],
    result : 0,
    totalNum : 0
  },

  //获取商品总价：  1个商品的总价 = 1个商品的单价 * 1个商品的数量   2
  totalResult : carts.totalResult,
  // totalResult(carts){
  //   let result = 0
  //   let num = 0
  //   carts.forEach(item=>{
  //     result += ((item.price*10) * item.num)/10
  //     num += item.num
  //   })
  //   result = result.toFixed(1)
  //   this.setData({
  //     result : result,
  //     totalNum : num
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let carts = storage.get("carts")
    this.setData({carts})

    if(!carts) return

    this.totalResult(carts)

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