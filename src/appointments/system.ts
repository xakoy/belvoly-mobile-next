import { execute } from '../web-bridge/native'

const serviceName = 'system'

/**
 * 登录
 * @method signOn
 * @param {String} account 用户名
 * @param {JSON} data 登录存储的附加数据
 */
export function signOn(account: string, data: { [key: string]: any }) {
    var dataString = data ? JSON.stringify(data) : ''
    return execute(serviceName, 'signOn', {
        account: account,
        data: dataString
    })
}

/*
 * 注销
 * @method signOut
 * @param {Boolean} [isClearData=false] 是否清除用户数据
 */
export function signOut(isClearData: boolean = false) {
    return execute(serviceName, 'signOut', { isClearData: isClearData })
}

/**
          * 登录
          * @method login
          * @param {String} account 用户名
          * @param {JSON} data 登录存储的附加数据
          * @param {JSON} keepStateData 保持登录状态的数据

          */
export function login(account: string, data: { [key: string]: any }, keepStateData: { [key: string]: any }) {
    var dataString = data ? JSON.stringify(data) : ''
    var keepStateDataString = keepStateData ? JSON.stringify(keepStateData) : ''

    return execute(serviceName, 'login', {
        account: account,
        data: dataString,
        keepStateData: keepStateDataString
    })
}

/**
 * 注销
 * @method logout
 * @param {Boolean} [isClearData=false] 是否清除用户数据
 * @param {Function} callback 回调函数
 */
export function logout(isClearData = false) {
    return execute(serviceName, 'logout', { isClearData: isClearData })
}

/**
 * 获取当前用户
 * @method getUser
 * @param {Function} callback 完成后的回调事件
 * @param {JSON} callback.data callback事件的第一个数据
 * @param {string} callback.data.account 当前用户名
 * @param {JSON} callback.data.data 登录存储的附加数据
 */
export async function getUser() {
    const data = await execute<{ data: string; account: string }>(serviceName, 'getUser')
    const userData = data.data ? JSON.parse(data.data) : null
    const result = {
        account: data.account,
        data: userData
    }
    return result
}

/**
 * 获取启动锁
 * @method getStartuplock
 */
export function getStartuplock() {
    return execute<
        Readonly<{
            /**
             * 是否启用
             */
            enabled: boolean
            /**
             * 超时时间（单位为秒
             */
            timeout: number
        }>
    >(serviceName, 'getStartuplock')
}

/**
 * 是否启用启动锁
 * @method enabledStartupLock
 * @param {boolean} enabled 是否启用
 * @param {int} timeout 超时时间（单位为秒）
 */
export function enabledStartupLock(enabled: boolean, timeout: number) {
    return execute<
        Readonly<{
            /**
             * 操作是否成功
             */
            isSuccess: boolean
        }>
    >(serviceName, 'enabledStartupLock', { enabled: enabled, timeout: timeout })
}

/**
 * 使用浏览器打开外部链接
 * @method openUrl
 * @param {string} url 外部链接地址
 */
export function openUrl(url: string) {
    return execute(serviceName, 'openUrl', {
        url: url
    })
}

/**
 * 退出应用
 * @method quit
 */
export function quit() {
    return execute(serviceName, 'quit', {})
}

/**
 * 系统提示
 * @method toast
 * @param {string} text 提示才文本
 * @param {int} displayTime 显示的时间（单位毫秒）
 */
export function toast(text: string, displayTime: number) {
    return execute(serviceName, 'toast', { text: text, displayTime: displayTime })
}

/**
 * 打电话
 * @method makePhoneCall
 * @param {string} phoneNumber 电话号码
 */
export function makePhoneCall(phoneNumber: string) {
    return execute(serviceName, 'makePhoneCall', { phoneNumber: phoneNumber })
}
/**
 * 系统信息
 * @method getSystemInfo
 * @param {String}systemInfo.displayName 应用名
 * @param {String} callback.platform
 * @param {Sting} systemInfo.bundleVersoin //包bundle
 * @param {Sting} systemInfo.sysVersion //系统版本号
 * @param {Sting} systemInfo.version  //系统版本号
 */
export function getSystemInfo() {
    return execute<
        Readonly<{
            /**
             * 应用名
             */
            displayName: string
            /**
             * 设备平台
             */
            platform: string
            /**
             * bundleVersoin 包bundle
             */
            bundleVersoin: string
            /**
             * 系统版本号
             */
            sysVersion: string
            /**
             * 版本号
             */
            version: string
        }>
    >(serviceName, 'getSystemInfo')
}

/**
 * 清空网页缓存(移动端由内部控制清除内容)
 * @method webClearCache
 */
export function webClearCache() {
    return execute(serviceName, 'webClearCache')
}
/**
 * 启动其它应用
 * @method startApp
 * @param {string} appName 应用名称
 */
export function startApp(appName: string) {
    return execute(serviceName, 'startApp', { appName: appName })
}
