let IS_APPENVIRONMENT = false,
    IS_APPENVIRONMENT_INIT = false

const gl = window as any

export function isApp() {
    if (IS_APPENVIRONMENT_INIT == false) {
        IS_APPENVIRONMENT = gl._belvolyNative != null
        IS_APPENVIRONMENT_INIT = true
    }
    return IS_APPENVIRONMENT
}

export function isWeChat() {
    return gl.BM_WeChat && gl.BM_WeChat.ready === true
}

export function isDingTalk() {
    return gl.BM_DingTalk && gl.BM_DingTalk.ready
}
