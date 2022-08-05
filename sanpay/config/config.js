/**
 * @author YangLing
 * @date 2021/12/20 2:27 PM
 */

/**
 * 封装请求的公共接口地址以及公共的参数
 */
const ApiConfig = {
    baseURL : "http://weixin.itying.com",
    namespace : "wx"
}

export default  ApiConfig

// 1. 项目名称
// 2. 这个项目能够解决什么问题
// 3. 这个项目用的什么技术栈
// 4. 这个项目是几个人开发
// 5. 这个项目用的版本控制是什么
// 6.这个项目你都负责了那些模块的开发
// 7. 你是如何开发项目这个项目的
// 8. 你开发的功能有哪些?
//     9. 你在开发这个项目的时候都遇到了哪些难点
// 10. 你是如何解决的
//
//
// 您好,那我给您介绍一下我之前做的一个小程序项目,我之前做的一个小程序项目是一个扫码支付类的产品,名字叫积云扫码购,(使用这个产品能够帮助用户快速实现商品购买与结算,能够提高超市结算效率,避免因商品结算导致超市结算台人员拥堵),这个项目小组一共两个人,一个前端,一个后台,ui和测试运维是公用的,因为他们还参与了其他组的项目,这个项目主要是我和我的那个后端同事负责开发.  然后我们这个项目版本控制用的git. 这个项目主要用到的技术栈有小程序语法(wxml,wxss,wxs),es
//
// 您好,那我给您介绍一下我之前做的一个小程序项目,我之前做的一个小程序项目是一个扫码支付类的产品,名字叫积云扫码购,(使用这个产品能够帮助用户快速实现商品购买与结算,能够提高超市结算效率,避免因商品结算导致超市结算台人员拥堵),这个项目小组一共两个人,一个前端,一个后台,ui和测试运维是公用的,因为他们还参与了其他组的项目,这个项目主要是我和我的那个后端同事负责开发.  然后我们这个项目版本控制用的git. 这个项目主要前端用到的技术栈有小程序语法(wxml,wxss,wxs),es6,javascript,iconfont图标库,还有一些其他的插件. 后端用到的技术栈有java + springBoot  + myql (php + mysql + thinkPhp).
//
//     在这个项目中我主要负责的模块有: 项目的搭建、代码的版本控制、路由的配置、tabBar的配置、http请求的二次封装、api接口的封装、一些可复用组件的封装, 静态页面的布局实现. 以及一些数据的渲染. 除了前期项目环境的搭建,还参与项目的需求分析,功能分析以及使用思维导图对项目功能模块进行梳理
//
//
// 该项目主要的模块有 扫码模块 , 购物车模块、结算模块 、 个人中心模块 、 订单模块、 支付模块 ......,
//
// 这个项目中实现的功能主要扫 扫码添加商品功能、 购物车数量与价格的计算功能 、 商品列表的展开与手气功能、 小程序支付功能 、 以及一些其他关于数据请求和渲染的一些操作.
//
//     大概能想到的就这么多了,以上就是我的这个项目的一些介绍,您这边有什么还需要了解的
//
//
// 难点:
//     1. 小程序的支付.     在处理签名的时候比较麻烦,因为当时没有和后台统一加密方式以及加密的规则还要加密属性. 当这些规则不统一的时候,我们前端拉起支付的时候老是报错.
//
//     解决方案:
// 2. 后来经过网上查看资料以及和同事的沟通,最终结局了这个问题, 后台我和后端统一了加密的方式以及加密的规则, 我们采用的加密方式为md5, 加密的属性有用户的id , openid, 还有salt密钥, 并且我在前端需要将这个属性遍历到数组里面,并进行排序,排序之后在将属性以及器对应的属性值进行拼接,最后在使用md5进行加密,然后在发送给后台就可以了
//
//
// 微信小程序支付:

//
//
// 微信小程序的支付功能:
//

//
//

//
// 代码:
//     代码一共分为2部分:
//         获取code码以及openid的相关信息:
//
//             -------------------------------------------------------------------------------
//                 //1. 调用wx.login方法,获取code码
//                 wx.login({
//                     success : async (res)=>{
//                         //2. 获取code码
//                         const code = res.code;
//                         //3. 调用获取openid的接口
//                         const result = await payApi.getOpenId(code);
//                         //4. 判断 如果成功 则标openid及其他相关的信息保存到畚斗, 失败 则进行一个错误提示
//                         if(result.data.success){
//                             const userinfo = result.data.userinfo;
//                             wx.setStorageSync('userinfo', userinfo)
//                         }else{
//                             wx.showToast({
//                                 title: '获取openId失败',
//                             })
//                         }
//                     },
//                     fail : ()=>{
//                         wx.showToast({
//                             title: '调用wx.login方法失败',
//                         })
//                     }
//                 })
// }
// ---------------------------------------------------------------------------------
//
//
//     点击确认支付按钮要执行的代码:
// /*支付方法*/
// async doPay() {
//     //显示加载中
//     wx.showLoading();
//
//     //获取商品的所用数据
//     const carts = wx.getStorageSync('carts');
//     // console.log(carts)
//
//     //获取本地存储的openid的相关信息
//     const userinfo = wx.getStorageSync('userinfo');
//     // console.log(userinfo)
//
//     //调用签名方法
//     const signData = sign({
//         openid: userinfo.openid,
//         salt: userinfo.salt,
//         uid: userinfo._id
//     });
//
//
//
//     //调用统一下单接口
//     const result = await payApi.unifiedOrder({
//         openid: userinfo.openid,
//         uid: userinfo._id,
//         sign: signData,
//         total_price: this.data.allPrice,
//         total_num: this.data.allNum,
//         derate_price: 0,
//         real_price: this.data.allPrice,
//         order: JSON.stringify(carts)
//     })
//
//     //做一个错误的处理
//     if (result.data.success) {
//         console.log(result.data.result)
//         const data = JSON.parse(result.data.result);
//         this.wxPay(data)
//         wx.hideLoading();
//     } else {
//         wx.hideLoading();
//         wx.showToast({
//             title: '统一下单失败',
//         })
//     }
//
// },
//
// /*拉起支付的方法*/
// wxPay(data) {
//     console.log(data)
//     wx.requestPayment({
//         timeStamp: data.timeStamp,
//         nonceStr: data.nonceStr,
//         package: data.package,
//         signType: 'MD5',
//         paySign: data.paySign,
//         success(res) {
//             console.log(res)
//         },
//         fail(res) {}
//     })
// }
//
//
//
// 签名加密的代码:
//     function sign(userinfo){
//         const arr = [];
//         for(var i in userinfo){
//             arr.push(i)
//         };
//         arr.sort();
//
//         let str = "";
//         for(var i=0;i<arr.length;i++){
//             str += arr[i] + userinfo[arr[i]];
//         }
//
//         console.log(md5(str));
//         return md5(str);
//
//     }
//
//
// 后端业务:
//
//     后端去写的,如果咱们公司需要写的话,我这边也可以解决,虽然没有写过,但是这个问题我能给解决
//
//     (闲鱼 或者 淘宝) ,在上面找人接单,专门给你解决问题, 收费(不建议)
//
