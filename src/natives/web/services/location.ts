import { GetAction } from '../../../appointments/location.de'

export const get: GetAction = async function () {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const result = {
                        point: {
                            /*
                             * 经度
                             */
                            longitude: position.coords.longitude,
                            /*
                             * 纬度
                             */
                            latitude: position.coords.latitude
                        }
                    }
                    resolve(result)
                },
                function (e) {
                    reject(e)
                }
            )
        })
    }
    throw new Error('浏览器不支持定位（geolocation）API')
}
