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
    const service = services[serviceCode]
    if (!service) {
        response.result = {
            flag: 0,
            code: 9999
        }
        return response
    }
    const action = service[actionCode]
    if (!action) {
        response.result = {
            flag: 0,
            code: 9999
        }
        return response
    }

    try {
        const arg = args ? JSON.parse(args) : {}
        const result = await action(args)
        response.result = {
            flag: 1,
            data: result
        }
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
        const global = window as any
        const BM = global.BM
        BM.webBridge.callback(callbackId, response.result, response.isDestroyCallback)
    }
}
