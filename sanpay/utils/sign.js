/**
 * @author YangLing
 * @date 2021/12/27 8:57 AM
 */
const md5 = require('./md5');
//生成签名的方法
export const sign = (json) => {
    console.log("json=>",json)
    let arr = []

    for(var key in json){
        arr.push(key)
    }

    arr.sort()

    let str = ""
    for(var i=0;i<arr.length;i++){
        str += arr[i] + json[arr[i]]
    }

    return md5(str)
}