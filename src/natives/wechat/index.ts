import { ActionResult, Native } from '../native'
import { services } from './services'
import { exec as execNative } from '../common'

export const native: Native = {
    exec: async function (serviceCode: string, actionCode: string, callbackId: string, args: string) {
        await execNative({ serviceCode, actionCode, callbackId, args }, code => {
            return services[code]
        })
    }
}
