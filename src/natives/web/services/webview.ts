import { BackAction, OpenAction } from '../../../appointments/webview.de'
import { ServiceBase } from './service-base'

const open: OpenAction = async function (url) {
    window.location.href = url
}

const back: BackAction = function () {
    window.history.back()
}

export class WebViewService extends ServiceBase {
    async open({ url }: { url: string }) {
        const result = await open(url)
        return this.toResult(result)
    }
    async back({ isImmediate }: { isImmediate: boolean }) {
        back(isImmediate)
    }

    popup = function () {
        console.warn('当前版本API，不再支持popup方法')
    }
}
