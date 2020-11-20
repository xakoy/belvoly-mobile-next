import { execute } from '../web-bridge/native'

const serviceName = 'file'

/**
 * 获取文件
 * @method getFiles
 * @param {Number} [maxTotal=0] 选择的最大数量（0为不限制）
 * @param {Function} callback 获取成功后的回调函数
 * @param {Array} callback.data 获取的数据
 * @param {string} callback.data.fileURI 文件的磁盘物理地址
 * @param {string} callback.data.fileSize 文件的文件字节大小
 */
export function getFiles(maxTotal = 0) {
    return execute<
        Readonly<{
            fileURI: string
            fileSize: number
        }>
    >(serviceName, 'getFiles', { maxTotal: maxTotal })
}

/**
 * 上传一个文件
 * @method uploadFile
 * @param {String} fileURI 文件的磁盘物理地址
 * @param {String} uploadURL 上传服务器地址
 * @param {Function} callback 获取成功后的回调函数
 * @param {JSON} callback.data 获取的数据
 * @param {Number} callback.data.state 上传的状态 0 准备, 1 上传中, 2 成功, 3 失败， 4 超时
 * @param {double} callback.data.progressPercentage 上传进度 1为100%
 * @param {string} callback.data.code 上传的code
 * @param {string} callback.data.message 上传的完成后返回的文本
 * @param {string} callback.data.result 上传的完成后服务端返回的数据
 */
export function uploadFile(fileURI: string, uploadURL: string) {
    return execute<
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
    >(serviceName, 'uploadFile', { fileURI: fileURI, uploadURL: uploadURL })
}

/**
 * 下载文件
 * 将文件下载到当前用户的指定目录中，并打开文件
 * @method download
 * @param {JSON} options 文件下载参数
 * @param {String} options.downloadURL 文件下载地址
 * @param {String} options.fileName 文件名（包含扩展名）
 * @param {String} [options.categoryCode] 文件的分类Code
 * @param {Object} [options.extendData] 文件关联的扩展数据（特殊需求使用）
 * @param {String} [options.id] 文件的唯一ID
 * @param {Boolean} [options.isFinishedOpen=true] 下载完成后是否打开文件
 * @param {Function} callback 下载的回调函数
 * @param {JSON} callback.data 下载的回调的数据
 * @param {Number} callback.data.state 下载的状态 0 准备, 1 上传中, 2 成功, 3 失败， 4 超时
 * @param {double} callback.data.progressPercentage 下载进度 1为100%
 * @param {string} callback.data.code 下载的code
 * @param {string} callback.data.message 下载的完成后返回的文本
 * @param {string} callback.data.result 下载的完成后服务端返回的数据
 */

/**
 * 下载文件
 * 将文件下载到当前用户的指定目录中，并打开文件
 * @method download
 * @param {String} downloadURL 文件下载地址
 * @param {String} fileName 文件名（包含扩展名）
 * @param {String} [categoryCode] 文件的分类Code
 * @param {Object} [extendData] 文件关联的扩展数据（特殊需求使用）
 * @param {Function} callback 下载的回调函数
 * @param {JSON} callback.data 下载的回调的数据
 * @param {Number} callback.data.state 下载的状态 0 准备, 1 上传中, 2 成功, 3 失败， 4 超时
 * @param {double} callback.data.progressPercentage 下载进度 1为100%
 * @param {string} callback.data.code 下载的code
 * @param {string} callback.data.message 下载的完成后返回的文本
 * @param {string} callback.data.result 下载的完成后服务端返回的数据
 */
export async function download(op: {
    id?: string
    downloadURL: string
    fileName: string
    categoryCode?: string
    extendData?: any
}) {
    var config = {
        ...{
            id: undefined,
            downloadURL: undefined,
            fileName: undefined,
            categoryCode: undefined,
            extendData: null,
            isFinishedOpen: true
        },
        ...op
    }

    if (config.id) {
        const isExists = await exists(config.id)
        if (isExists) {
            if (config.isFinishedOpen) {
                open(config.id)
            } else {
                return { state: 6 }
            }
        } else {
            return await downloadFile(config)
        }
    } else {
        return await downloadFile(config)
    }
}

function downloadFile(config: {
    id?: string
    downloadURL: string
    fileName: string
    categoryCode?: string
    extendData?: any
    isFinishedOpen?: boolean
}) {
    return execute<
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
    >(serviceName, 'download', config)
}

/**
 * 查询文件是否存在
 * @method exists
 * @param {String} id 文件的ID
 * @param {Function} callback 查询后的回调函数
 * @param {Boolean} callback.result 查询的结果
 */
export function exists(id: string) {
    return execute<boolean>(serviceName, 'exists', { id: id })
}
/**
 * 根据文件ID打开文件
 * @method open
 * @param {String} id 文件的ID
 */
export function open(id: string) {
    execute(serviceName, 'open', { id: id })
}

/**
 * 获取本地图片文件内容
 * @method getLocalImgData
 * @param {string} imgURI 本地图片URI
 * @exception 如果imgURI不是一个图片文件，则返回异常代码501
 */
export function getLocalImgData(imgURI: string) {
    return execute<
        Readonly<{
            /**
             * 本地图片URI
             */
            uri: string
            /**
             * 图片的大小
             */
            size: number
            /**
             * 图片的名称
             */
            name: string
            /**
             * 图片的base64格式，而直接放到img src属性中
             */
            baseData: string
        }>
    >(serviceName, 'getLocalImgData', { imgURI: imgURI })
}

/**
 * 获取本地文件列表
 * @method query
 */
export function query(categoryCode: string) {
    return execute<
        Readonly<
            {
                /**
                 * 文件分类Code
                 */
                categoryCode: string
                /**
                 * 文件列表
                 */
                files: {
                    /**
                     * 文件id
                     */
                    id: string
                    /**
                     * 文件名
                     */
                    name: string
                    /**
                     * 文件大小
                     */
                    size: number
                    /**
                     * 下载地址
                     */
                    downloadURL: string
                    /**
                     * 本地文件路径
                     */
                    localPath: string
                    /**
                     * 文件关联的扩展数据
                     */
                    extendData: any
                    /**
                     * 文件下载时间
                     */
                    downloadDate: Date
                }[]
            }[]
        >
    >(serviceName, 'query', { categoryCode: categoryCode })
}

/**
 * 根据文件本地路径打开文件
 * @method show
 * @param {String} localPath 文件的路径
 */
export function show(localPath: string) {
    return execute(serviceName, 'show', { localPath: localPath })
}

/**
 * 删除本地文件
 * @method remove
 * @param {String} id 文件id
 */
export function remove(id: string) {
    return execute(serviceName, 'remove', { id: id })
}
