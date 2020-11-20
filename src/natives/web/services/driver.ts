import { GetAction } from '../../../appointments/driver.de'

export const get: GetAction = async function () {
    return {
        /*
         * 设备名称
         * @type string
         */
        name: 'Browser',
        /*
         * 平台 android 或 ios
         * @type string
         */
        platform: 'web',
        /*
         * 系统版本
         * @type string
         */
        version: '3.0.0',
        /*
         * 框架版本
         * @type string
         */
        belvolyVersion: '3.0'
    }
}
