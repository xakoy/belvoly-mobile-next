import { execute } from "../web-bridge/native";

const serviceName = "driver";

type Platform = 'android' | 'ios' | 'web' | 'wechat' 

interface DriverInfo {
    /**
     * 设备名称
     */
    name: string
    /**
     * 平台
     */
    platform: Platform
    /**
     * 系统版本
     */
    version: string
    /**
     * 框架版本
     */
    belvolyVersion: string
}

/**
 * 获取设备信息
 * @method get 
 * @example
 * 
 *      BM.appointment.driver.get(function(data){
 *          alert("当前的设备是:" + data.name)
 *      })
 * 
 */
export async function get() {
    return await execute<Readonly<DriverInfo>>(serviceName, "get", {});
}

let _lasterInfo: Readonly<DriverInfo> | null = null;

/**
 * Overwritten method see {{#crossLink "appointment.driver/get"}}{{/crossLink}}
 * 
 * 
 * 获取最近一次设备信息，此方法是对 [get] 方法做了缓存包装. 参数参考[get]
 * 
 * @method getLaster 
 */
export async function getLaster() {
    if (_lasterInfo != null) {
        return _lasterInfo
    }
    else {
        const info = await get()
        _lasterInfo = info;
        return _lasterInfo
    }
}

/**
 * 获取系统指纹相关信息
 * @method getFingerprintInfo
 */
export async function getFingerprintInfo() {
    return await execute<Readonly<{
        /**
         * 系统是否支持指纹
         */
        isSupport: boolean
        /**
         * 系统是否设置过指纹
         */
        isSet: boolean
    }>>(serviceName, "getFingerprintInfo", {});
}

/**
 * 获取手机系统生成的设备识别码
 * @method getDeviceInfo
 */
export async function getDeviceInfo() {
    return await execute<Readonly<{
        /**
         * 设备识别号 经过加密
         */
        deviceID: string
        /**
         * 设备平台
         */
        platform: string
        /**
         * 设备系统版本
         */
        sysVersion: string
    }>>(serviceName, "getDeviceInfo", {})
}
