/**
 * @author YangLing
 * @date 2021/12/20 3:03 PM
 */

/**
 * 方法的作用： 将wx.request转化为promise对象
 * @param method  "request"
 * @param options  "{}"
 * @returns {Promise<unknown>}
 */
function wxToPromise(method,options = {}){
    return new Promise((resolve, reject)=>{
        options.success = resolve
        options.fail = err=>{
            reject(err)
        }
        wx[method](options)
    })
}

export default wxToPromise