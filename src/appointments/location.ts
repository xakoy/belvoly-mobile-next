import { execute } from '../web-bridge/native'
import { GetAction } from './location.de'

const serviceName = 'location'

/**
 * 获取定位
 * @method get
 */
export const get: GetAction = async function () {
    return await execute<
        Readonly<{
            /**
             * 定点信息
             */
            point: {
                /**
                 * 经度
                 */
                longitude: number
                /**
                 * 纬度
                 */
                latitude: number
            }
        }>
    >(serviceName, 'get', {})
}
