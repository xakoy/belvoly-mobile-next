import { Native } from './native'
import { native as webNative } from './web/index'
import { native as wechatNative } from './wechat/index'
import { native as dingtalkNative } from './dingtalk/index'
import { isApp, isDingTalk, isWeChat } from './environment'

const gl = window as any

function getNative(): Native {
    if (isApp()) {
        return gl._belvolyNative
    } else if (isWeChat()) {
        return wechatNative
    } else if (isDingTalk()) {
        return dingtalkNative
    } else {
        return webNative
    }
}

if (!gl._belvolyNative) {
    const nt = getNative()
    if (nt) {
        gl._belvolyNative = nt
    }
}

const native = gl._belvolyNative as Native

export { native }
