import { log } from '../../log'
import { ActionResult, Native } from '../native'
import { services } from './services'

async function handle(
    serviceCode: string,
    actionCode: string,
    callbackId: string,
    args: string
): Promise<{
    result?: ActionResult
    isDestroyCallback: boolean
}> {
    const response: {
        result?: ActionResult
        isDestroyCallback: boolean
    } = {
        isDestroyCallback: true
    }
    const serviceType = services[serviceCode]
    if (!serviceType) {
        response.result = {
            flag: 0,
            code: 10000,
            message: `暂不支持${serviceCode}服务`
        }
        return response
    }

    const service = new serviceType()
    service.callbackID = callbackId

    const action = service[actionCode]
    if (!action) {
        response.result = {
            flag: 0,
            code: 10001,
            message: `暂不支持${actionCode}方法`
        }
        return response
    }

    try {
        const arg = args ? JSON.parse(args) : {}
        const result = await action.call(service, arg)
        response.result = result
        return response
    } catch (e) {
        response.result = {
            flag: 0,
            message: e.toString()
        }
        return response
    }
}

export const native: Native = {
    exec: async function (serviceCode: string, actionCode: string, callbackId: string, args: string) {
        const response = await handle(serviceCode, actionCode, callbackId, args)
        const gl = window as any
        const BM = gl.BM
        if (response.result && response.result.code && response.result.code >= 10000) {
            log(response.result)
        } else {
            BM.webBridge.callback(callbackId, JSON.stringify(response.result), response.isDestroyCallback)
        }
    }
}
