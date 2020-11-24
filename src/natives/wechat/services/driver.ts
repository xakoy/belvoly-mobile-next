import { GetAction } from '../../../appointments/driver.de'
import { DriverService as WebDriverService } from '../../web/services/driver'

const get: GetAction = async function () {
    return {
        /*
         * 设备名称
         * @type string
         */
        name: 'wechat',
        /*
         * 平台 android 或 ios
         * @type string
         */
        platform: 'wechat',
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

export class DriverService extends WebDriverService {
    async get(arg: any) {
        const result = await get()
        return this.toResult(result)
    }
}
