import { log } from '../log'
import { ActionResult, Native, ServiceFactory } from './native'

async function handle(
    serviceCode: string,
    actionCode: string,
    callbackId: string,
    args: string,
    getServiceFun: ServiceFactory
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
    const serviceType = getServiceFun(serviceCode)
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
        response.result = {
            flag: result.flag,
            code: result.code,
            data: result.data,
            message: result.message
        }
        response.isDestroyCallback = result.isDestroyCallback
        return response
    } catch (e) {
        response.result = {
            flag: 0,
            message: e.toString()
        }
        return response
    }
}

export const exec = async function (
    options: { serviceCode: string; actionCode: string; callbackId: string; args: string },
    serviceFactory: ServiceFactory
) {
    const response = await handle(
        options.serviceCode,
        options.actionCode,
        options.callbackId,
        options.args,
        serviceFactory
    )
    execCore(options.callbackId, response)
}

export const execCore = function (
    callbackId: string,
    response: {
        result?: ActionResult
        isDestroyCallback: boolean
    }
) {
    const gl = window as any
    const BM = gl.BM
    if (response.result && response.result.code && response.result.code >= 10000) {
        log(response.result)
    } else {
        BM.webBridge.callback(callbackId, JSON.stringify(response.result), response.isDestroyCallback)
    }
}
