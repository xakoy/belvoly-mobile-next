import { callback, interfaceData } from './core'
import { execute } from './native'

export const webBridge = {
    interfaceData: interfaceData,
    callback: callback,
    native: {
        execute: execute
    }
}
