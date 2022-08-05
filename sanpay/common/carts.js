import ProductionModel from "../model/production";
import {navigateTo} from "../utils/wxApi";
import storage from "../utils/storage";

/**
 * @author YangLing
 * @date 2021/12/22 4:32 PM
 */
async function getQrcode(event){
    //获取到子组件传递过来的商品的条形码
    let result = event.detail.qrcode
    //如果所扫码商品的条形码不存在或者有问题我门则不继续往下执行
    if(!result) return;
    //通过扫码商品的条形码获取到对应商品的信息
    let res = await ProductionModel.getProduction(result)
    //判断如果通过条形码获取到了商品信息，则跳转到购物车页面
    if(res.result && res.result.length > 0){
        //调用addCart方法
        this.addCart(res.result[0])
        navigateTo("/pages/cart/cart")
    }
}

/**
 * 将获取到的商品数据存储到本地
 * @param data
 */
function addCart(data){
    //如果添加的商品不存在，我们则不再继续往下执行
    if(!data) return;
    //初始化一个数组，用来保存要给本地添加的商品信息
    let arr = []
    // 存之前要先获取本地存储的所有的商品信息
    let carts = storage.get("carts")
    //先判断本地有没有商品信息
    if(carts && carts.length > 0){
        //当前要给本地添加的商品信息是否在本地存在
        let status = this.hasProduction(data,carts)
        console.log(status)
        if(!status){
            data.num = 1;
            carts.push(data)
            storage.set("carts",carts)
        }else{
            carts.forEach(item=>{
                if(item._id == data._id){
                    item.num += 1
                }
            })
            console.log(carts)
            storage.set("carts",carts)
        }
    }else{
        data.num = 1;
        arr.push(data)
        storage.set("carts",arr)
    }
}

/**
 * 要添加的商品信息 在 所有的商品信息 里面是否存在  存在 true 不存在false
 * @param data
 * @param carts
 */
function hasProduction(data,carts){
    let dataStatus = false;
    carts.forEach(item=>{
        if(item._id == data._id) dataStatus = true
    })
    return dataStatus
}

/**
 * 获取商品的总价
 * @param carts
 */
function totalResult(carts){
    let result = 0
    let num = 0
    carts.forEach(item=>{
        result += ((item.price*10) * item.num)/10
        num += item.num
    })
    result = result.toFixed(1)
    this.setData({
        result : result,
        totalNum : num
    })
}

export default {
    getQrcode,
    addCart,
    hasProduction,
    totalResult
}