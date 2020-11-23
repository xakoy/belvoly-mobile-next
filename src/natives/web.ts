import { native } from './web/index'

const gl = window as any
if (!gl._belvolyNative) {
    gl._belvolyNative = native
}

export { native }
