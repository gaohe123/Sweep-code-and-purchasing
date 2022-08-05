/**
 * @author YangLing
 * @date 2021/12/21 3:02 PM
 */
import Http from "../utils/http";

/**
 * 封装商品模块的api
 */
class ProductionModel extends Http{
    /**
     * 扫码获取商品信息接口
     * @param qcode
     * @returns {Promise<*|undefined>}
     */
    static getProduction(qcode){
       return Http.request({
            url : "/api/getProduct",
            method : "GET",
            data : {qcode}
        })
    }
}

export default ProductionModel