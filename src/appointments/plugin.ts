/** @format */

import {execute} from '../web-bridge/native'

const serviceName = 'plugin'

/**
 * 显示插件
 * @param code 插件的标识
 * @param functionCode 功能的标识
 * @param params 传递的参数 JSON
 */
export async function show<T>(code: string, functionCode: string, params: {[key: string]: any}) {
    return await execute<T>(serviceName, 'show', {
        code: code,
        functionCode: functionCode,
        params: JSON.stringify(params || {}),
    })
}

/**
 * 调用执行插件
 * @param code 插件的标识
 * @param functionCode 功能的标识
 * @param params 传递的参数 JSON
 * @returns 返回插件的方法返回值
 */
export async function exec<T>(code: string, functionCode: string, params: {[key: string]: any}) {
    return await show(code, functionCode, params)
}
