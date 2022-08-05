# sanPay
扫码支付小程序

## 一、创建小程序项目

## 二、实现tabBar以及创建对应的tabBar页面

### 2.1 创建对应的tabBar页面

```
"pages": [
    "pages/shopping/shopping",
    "pages/product/product",
    "pages/personal/personal"
],
```

### 2.2 创建tabBar

```
"tabBar" : {
    "color" : "#333",
    "selectedColor" : "#f60",
    "backgroundColor" : "#fff",
    "list" : [
      {
        "pagePath" : "pages/shopping/shopping",
        "text" : "扫码购物",
        "iconPath" : "/assets/images/index02.png",
        "selectedIconPath" : "/assets/images/index01.png"
      },
      {
        "pagePath" : "pages/product/product",
        "text" : "每日优选",
        "iconPath" : "/assets/images/product02.png",
        "selectedIconPath" : "/assets/images/product01.png"
      },
      {
        "pagePath" : "pages/personal/personal",
        "text" : "个人中心",
        "iconPath" : "/assets/images/user02.png",
        "selectedIconPath" : "/assets/images/user01.png"
      }
    ]
  }
```

## 三、封装wx.request

### 3.1 抽离请求的公共接口地址与公共的参数

```
/**
 * 封装请求的公共接口地址以及公共的参数
 * @type {{order_no: string, baseURL: string, i_code: string}}
 */
const ApiConfig = {
    baseURL : "https://qinchenju.com/homemaking",
    i_code : "733154FCB0EF61F8",
    order_no : "2107091110479009"
}

export default  ApiConfig
```

### 3.2 将wx.request对象转化为promise对象

```
/**
 * 方法的作用： 将wx.request转化为promise对象
 * @param method  "request"
 * @param options  "{}"
 * @returns {Promise<unknown>}
 */
function wxToPromise(method,options){
    return new Promise((resolve, reject)=>{
        options.success = resolve
        options.fail = err=>{
            reject(err)
        }
        wx[method](options)
    })
}

export default wxToPromise
```

### 3.3 对请求成功的结果以及请求失败的结果进行处理

#### 3.3.1 成功的返回结果处理

```
if(res.statusCode < 400){
   return res.data.data
}
```

#### 3.3.2 状态码为401的返回结果处理



#### 3.3.3 状态码小于400 并且 不等于 401 的返回结果处理

```
HTTP.showError(res.data.error_code,res.data.message)

static showError(errorCode,message = ""){
        let title = ""
        title = exceptionMessage[errorCode] || message || "未知异常"
        wx.showToast({
            title : title,
            icon : "none",
            duration : 3000
        })
}

```

## 四、封装api(model层)

```
import Http from "../utils/http"
import ApiConfig from "../config/config";

class UserModel extends Http{
   static getAuthToken(){
        return Http.request({
            url : "/v1/token",
            method : "POST",
            data : {
                i_code : ApiConfig.i_code,
                order_no : ApiConfig.order_no
            }
        })
    }
}

export default  UserModel
```

## 五、封装本地存储方方案


## 项目总结

### 支付功能：

#### 一、进行小程序支付前的准备工作:

1.1 注册小程序的账号 (不能是个人号,个人号无法认证,并且无法开通微信支付)
    
1.2 进行小程序的认证 (300/年)
    
1.3 开通微信支付  (填写支付所需要的相关信息)

#### 二、实现微信小程序支付功能

- 实现思路
  - 当小程序启动的时候,调用wx.login获取小程序的code码
  - 获取到小程序的code码之后,调用获取openid接口,获取到openid
  - 将获取到的openid以及其他信息保存到本地
  - 当点击确认支付按钮时调用统一下单接口,将对应的参数发送给后台,其中有一个签名非常重要,使用的md5进行的加密
  - 当统一下单接口调用成功之后,后台会给我们返回支付所需要的相关信息
  - 获取到支付相关的信息之后,调用封装的微信支付方法,拉起支付,把对应支付信息传进去就能够完成支付功能
  - 注意:加密以这块我们根据后台的要求,只加密了openid uid 以及salt等属性以及属性值,用的是md5
    
- 业务流程
  - 前端业务:
      1. 在小程序启动的时候,调用wx.login方法获取凭证(凭证也就是code码)
      2. 调用获取openid接口,通过传递code码获取后台给返回的openid以及相关信息
      3. 将openid和相关信息保存到本地
      4. 当点击确认支付按钮的时候,调用统一下单接口
         4.1 获取保存到本地的openid以及相关信息
         4.2 获取购物车的数据,并且将获取到的购物车的数据,转化为字符串(使用JSON.stringify()方法)
         4.3 实现签名
         4.3.1 和后端确定加密的方式(md5)以及所要加密的字段
         4.3.2 创建一个sign方法,在这个方法里面接收我们要加密的字段
      5. 在sign方法里面,创建一个数组
      6. 使用for in语句遍历加密的字段
      7. 将遍历的字段添加数组里面
      8. 对数组使用sort方式进行排序
      9. 初始化str变量,用来保存加密的字段属性和字段值的拼接
      10. 在使用for语句遍历保存加密字段属性的数组
      11. 引入md5模块
      12. 使用md5进行加密
      13. 将加密之后的内容return 返回sign这个方法 
          13.1 将统一下单接口所需要参数一一进行传递
      14. 当统一下单接口调用成功之后,能够获取到支付所需要的相关信息
      15. 调用小程序内置的支付api,将支付api所需要的参数进行传递,如果正确的话,则拉起支付
      16. 进行支付 
      17. 支付成功之后,清除购物车的数据,并且跳转到支付成功的页面


