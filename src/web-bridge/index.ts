import { callback } from './core'
import { execute } from './native'

export const webBridge = {
    callback: callback,
    native: {
        execute: execute
    }
}
