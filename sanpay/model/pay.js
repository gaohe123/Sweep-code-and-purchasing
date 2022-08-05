/**
 * @author YangLing
 * @date 2021/12/25 9:41 AM
 */
import Http from "../utils/http";

/**
 * 封装获取openid的api
 */
class PayModel extends Http{
    /**
     * 扫码获取商品信息接口
     * @param code
     * @returns {Promise<*|undefined>}
     */
    static getOpenid(code){
        return Http.request({
            url : "/weixinpay/login",
            method : "GET",
            data : {code}
        })
    }

    /**
     * 封装统一下单接口
     * @param data
     * @returns {Promise<*|undefined>}
     */
    static doOrder(data = {}){
        return Http.request({
            url : "/weixinpay/doOrder",
            method : "POST",
            data
        })
    }
}

export default PayModel