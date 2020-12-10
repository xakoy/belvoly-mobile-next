import { appointment } from './common/bm'

export function bootstrap(publicPath: string) {
    const backButtonDelegate = function() {
        //首页返回键处理
        //处理逻辑：1秒内，连续两次按返回键，则退出应用；
        let first = null
        const stopTime = 2000
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
            first = new Date().getTime()

            // BM.appointment.system.toast("再点一次即可退出", stopTime);
            const paths = [`${publicPath}/home`]
            const pathname = window.location.pathname
            if (paths.indexOf(pathname) > -1) {
                appointment.system.quit()
            } else {
                window.history.back()
            }

            setTimeout(function() {
                first = null
            }, stopTime)
        } else {
            if (new Date().getTime() - first < stopTime) {
                appointment.system.quit()
            }
        }
    }

    window.addEventListener('load', function() {
        appointment.document.on('backbutton', backButtonDelegate)
        appointment.webview.setHistroyEnabled(true)
    })
    window.addEventListener('beforeunload', function() {
        appointment.document.off('backbutton', backButtonDelegate)
    })
}
