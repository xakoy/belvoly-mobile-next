import { log } from '../log'

const ERRORS: {
    [key: number]: string
} = {
    [1]: '系统异常',
    [100]: '定位异常',
    [101]: '获取定位失败',
    [102]: '没有开启定位功能',
    [501]: '传入文件地址的不是一个图片文件',
    [9990]: '不支持该功能',
    [9999]: '系统异常'
}

export interface Arg<T> {
    flag?: number
    Flag?: number
    code?: number
    message?: string
    data?: T
}

function errorHandle(args: Arg<any>) {
    var error_message = args.code != null ? ERRORS[args.code] || args.message : args.message
    if (error_message) {
        alert(error_message)
    }
}

function beforeHandle(args: Arg<any>) {
    var flag = args.Flag || args.flag
    if (!flag || flag == 0) {
        errorHandle(args)
        return false
    }

    return true
}

let identity = 1

export interface Handle<T> {
    (data: T): void
}

interface HandleCollection {
    [key: string]: Handle<any>
}

const handles: HandleCollection = {}

/**
 * IOS和android 回调方法
 * @method callback
 * @param {String} id 回调方法的id
 * @param {String} args参数，为json字符串
 * @param {Boolean} destroyCallback为是否释放该callback，不传时默认为true
 */
export function callback(id: string, args: string | Arg<any>, isDestroyCallback: boolean = true) {
    try {
        log('callbackID:' + id + ', args:' + args)
        let arg: Arg<any>

        if (typeof args === 'string') {
            arg = JSON.parse(args)
        } else {
            arg = args
        }

        if (beforeHandle(arg)) {
            if (!id) {
                return
            }
            log('CallBackID:' + id)

            var handle = handles[id]

            if (!handle) {
                log('回调函数不存在:' + id)
                return
            }

            handle(arg.data)
        }

        if (isDestroyCallback) {
            destroyCallback(id)
        }
    } catch (e) {
        alert(e)
    }
}

/*
 * 释放回调事件
 */
function destroyCallback(callbackId: string) {
    delete handles[callbackId]
}

/*
 * 将普通数据转换为协议数据
 * @data {Object} 返回数据
 * @flag {Boolean} 是否成功
 * @code {int} 响应编号
 * @message {String} 消息
 */
export function interfaceData(data: any, flag: number, code: number = 0, message: string = '') {
    var response = {
        flag: !!flag ? 1 : 0,
        message: message,
        code: code,
        data: data || {}
    }
    return JSON.stringify(response)
}

const exception = {
    systemExcetpion: interfaceData({}, 0, 9999),
    positionExcetpion: interfaceData({}, 0, 100),
    positionFailed: interfaceData({}, 0, 101),
    positionTurnOff: interfaceData({}, 0, 102),
    unsupportException: interfaceData({}, 0, 9990)
}

/*
 * 注册回调事件
 * @method registerCallback
 * @returns {String} ID
 */
export function registerCallback<T>(handle?: Handle<T>) {
    if (!handle) {
        return
    }
    var id = 'webBridgeCallback' + identity++
    log('注册回调函数:' + id)
    handles[id] = handle

    return id
}
