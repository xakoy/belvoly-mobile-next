import { execute } from '../web-bridge/native'

/**
 * 照相机
 * @class camera
 * @module BM.appointment
 */
const serviceName = 'camera'

/**
 * 获取一张图片
 * @method getPictrue
 * @param {JSON} [options] 参数配置
 * @param {Number} [options.compressionRatio=1] 压缩比例，默认为1 。 如0.75 = 75%
 * @param {Function} callback 获取成功后的回调函数
 * @param {JSON} callback.data 获取的数据
 * @param {string} callback.data.imgURI 图片的磁盘物理地址
 * @param {string} callback.data.fileSize
 */
export async function getPicture(op: { compressionRatio: number; size: number }) {
    const options = {
        ...{
            compressionRatio: 0.1,
            size: 512000
        },
        ...op
    }

    return await execute<
        Readonly<{
            /**
             * 图片的磁盘物理地址
             */
            imgURI: string
            /**
             * 图片的文件字节大小
             */
            fileSize: number
        }>
    >(serviceName, 'getPicture', options)
}

/**
 * 上传一张图片
 * @method uploadPicture
 * @param {JSON} options 参数配置
 * @param {String} options.imgURI 图片的磁盘物理地址
 * @param {String} options.uploadURL 上传服务器地址
 * @param {Number} [options.compressionRatio=1] 压缩比例，默认为1 。 如0.75 = 75%
 */

export async function uploadPicture(op: {
    /**
     * 图片的磁盘物理地址
     */
    imgURI: string
    /**
     * 上传服务器地址
     */
    uploadURL: string
    /**
     * 压缩比例，默认为0.1 。 如0.75 = 75%
     */
    compressionRatio?: number
    size?: number
}) {
    const options = {
        ...{
            imgURI: '',
            uploadURL: '',
            compressionRatio: 0.1,
            size: 512000
        },
        ...op
    }

    return await execute<
        Readonly<{
            /**
             * 上传的状态 0 准备, 1 上传中, 2 成功, 3 失败， 4 超时  , 6 文件在本地缓存已存在
             */
            state: number
            /**
             * 上传进度 1为100%
             */
            progressPercentage: number
            /**
             * 上传的code
             */
            code: string
            /**
             * 上传的完成后返回的文本
             */
            message: string
            /**
             * 上传的完成后服务端返回的数据
             */
            result: string
        }>
    >(serviceName, 'uploadPicture', options)
}

/**
 * 扫码
 * @method scanQR
 * 获取到的文本结果
 */
export async function scanQR() {
    return await execute<string>(serviceName, 'scanQR', {})
}
