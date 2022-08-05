/**
 * @author YangLing
 * @date 2021/12/22 2:02 PM
 */

import ApiConfig from "../config/config";

/**
 * 获取命名空间的数据
 * @param key
 * @returns {any}
 */
const getStorage = ()=>{
    return wx.getStorageSync(ApiConfig.namespace) || {}
}

/**
 * 获取本地存储的数据
 * @param key
 * @returns {*}
 */
const get = (key)=>{
    return getStorage()[key]
}

/**
 * 设置本地存储的数据
 * @param key
 * @param value
 */
const set = (key,value)=>{
    let storage = getStorage()
    storage[key] = value
    wx.setStorageSync(ApiConfig.namespace,storage)
}


/**
 * 删除本地存储的某一项数据
 * @param key
 */
const remove = (key) => {
    let storage = getStorage()
    delete storage[key]
    wx.setStorageSync(ApiConfig.namespace,storage)
}

/**
 * 清空本地存储的数据
 */
const clear = () => {
    wx.clearStorageSync()
}

export  default {
    get,
    set,
    remove,
    clear
}