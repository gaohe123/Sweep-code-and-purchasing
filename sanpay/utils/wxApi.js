/**
 * @author YangLing
 * @date 2021/12/21 3:22 PM
 */

/**
 * 封装了页面跳转方法
 * @param url
 */
export const navigateTo = (url) =>{
    wx.navigateTo({url})
}
export const navigateTabTo = (url) =>{
    wx.switchTab({url})
}