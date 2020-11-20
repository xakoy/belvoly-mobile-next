import { BackAction, OpenAction } from '../../../appointments/webview.de'

export const open: OpenAction = async function (url) {
    window.location.href = url
}

export const back: BackAction = function () {
    window.history.back()
}

export const popup = function () {
    console.warn('当前版本API，不再支持popup方法')
}
