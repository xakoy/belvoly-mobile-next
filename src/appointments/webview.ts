import { execute } from '../web-bridge/native'

const serviceName = 'webview'

var toAbsURL = function (url: string) {
    var a = document.createElement('a')
    a.href = url
    return a.href
}

/**
 * 打开一个新的view，此方法和navigate方法效果一样
 * @method open
 * @param {String} url view中的URL地址为
 * @param {String} [direction] 打开Url的窗口的动画. 此参数暂时设置无效果
 * @param {Boolean} [true] isNeedProgressBar 是否需要显示进度条
 * @param {Boolean} [true] isNeedTitle 是否需要标题
 */
export async function open(url: string, direction?: string, isNeedProgressBar?: boolean, isNeedTitle?: boolean) {
    return await navigate(url, direction, isNeedProgressBar, isNeedTitle)
}

/**
 * 打开一个新的view
 * @method navigate
 * @param {String} url view中的URL地址为
 * @param {String} [direction] 打开Url的窗口的动画. 此参数暂时设置无效果
 * @param {Boolean} [true] isNeedProgressBar 是否需要显示进度条
 * @param {Boolean} [true] isNeedTitle 是否需要标题
 */
export async function navigate(url: string, direction?: string, isNeedProgressBar?: boolean, isNeedTitle?: boolean) {
    url = toAbsURL(url)
    if (!url) {
        alert('url 为null')
    }
    return await execute(serviceName, 'open', {
        url: url,
        direction: direction,
        isNeedProgressBar: isNeedProgressBar,
        isNeedTitle: isNeedTitle
    })
}

interface PopupOption {
    /**
     * 打开的url
     */
    url: string
    /**
     * 窗口ID
     */
    id?: string
    /**
     * 标题
     */
    title?: string
    /**
     * 传递给打开页面的数据，此数据可以用getRequestData方法获取到
     */
    data?: any
    /**
     * 是否需要显示进度条url
     */
    isNeedProgressBar?: boolean
    /**
     * 是否需要显示标题栏
     */
    isNeedTitle?: boolean
    /**
     * 标题栏配置
     */
    titleBar?: {
        /**
         * 是否显示标题栏
         */
        show: boolean
        /**
         * 文字颜色
         */
        color: string
        /**
         * 背景颜色
         */
        backgroundColor: string
        /**
         * 是否启用阴影
         */
        shadowEnabled: boolean
    }
    immersiveStatusBar?: {
        /**
         * 是否启用
         */
        enabled: boolean
        /**
         * 状态栏字体颜色默认白色，style:'dark'设置黑色
         */
        style: string
        /**
         * 背景颜色
         */
        backgroundColor: string
        /**
         * 是否透明
         */
        allowTransparency: boolean
    }
    /**
     * 关闭回调事件
     */
    onClose?: (data: any) => void
}

/**
 * 弹出一个页，并能够在关闭的时候接受回调函数
 * @method popup
 * @param op 选项
 */
export async function popup(op: PopupOption) {
    const config: PopupOption = {
        ...{
            id: '',
            url: '',
            title: '',
            isNeedProgressBar: true,
            isNeedTitle: true,
            titleBar: {
                show: true,
                color: '#FFFFFF',
                backgroundColor: '#3492E9',
                shadowEnabled: false
            },
            immersiveStatusBar: {
                enabled: false,
                style: 'default',
                backgroundColor: '#3492E9',
                allowTransparency: false
            },
            onClose: function () {},
            data: {}
        },
        ...op
    }

    config.url = toAbsURL(op.url)

    const data = await execute(serviceName, 'popup', {
        url: config.url,
        title: config.title,
        data: JSON.stringify(config.data),
        isNeedProgressBar: config.isNeedProgressBar,
        isNeedTitle: config.isNeedTitle,
        titleBar: config.titleBar,
        immersiveStatusBar: config.immersiveStatusBar
    })
    if (config.onClose) {
        config.onClose(data)
    }
}

/**
 * 页面后退
 * @method back
 * @param {boolean} [isImmediate = false] 是否立即后退，如果是，则不触发viewBeforeBack事件
 */
export function back(isImmediate: boolean = false) {
    execute(serviceName, 'back', { isImmediate: isImmediate === true })
}

/**
 * 关闭一个页, 对于open方法
 * @method close
 */
export function close() {
    execute(serviceName, 'close')
}

/**
 * 关闭 Propup 页，对应popup方法
 * @method closePopup
 * @param {object} data 传递给打开Popup的方法
 */
export function closePopup(data: any) {
    execute(serviceName, 'closePopup', { data: data })
}
/**
 * [默认三种: back => 后退 点击为后退.  home => 点击为跳到首页 . none => 去掉图标. 并且点击返回键也不能有任何响应]
 */
type ViewButtonCode = 'back' | 'home' | 'none'
/**
 * 设置当前窗口的按钮
 * @method setViewButton
 * @param {string} buttonCode 按钮代号    [默认三种: back => 后退 点击为后退.  home => 点击为跳到首页 . none => 去掉图标. 并且点击返回键也不能有任何响应]
 */
export function setViewButton(buttonCode: ViewButtonCode) {
    execute(serviceName, 'setViewButton', { buttonCode: buttonCode })
}

/**
 * 跳转到登录主界面
 * @method goHome
 */
export function goHome() {
    execute(serviceName, 'goHome')
}

/**
 * 跳转到登录界面
 * @method goLoginView
 */
export function goLoginView() {
    execute(serviceName, 'goLoginView')
}

/**
 * 设置当前页面的标题
 * @method setTitle
 * @param {String} title 标题
 */
export function setTitle(title: string) {
    execute(serviceName, 'setTitle', { title: title })
}

/**
 * 禁用刷新选项
 * @method disabledRefresh
 * @param {Boolean} disabled 是否禁用
 */
export function disabledRefresh(disabled: boolean) {
    execute(serviceName, 'disabledRefresh', { disabled: disabled })
}

/**
 * 添加字体Toolbar
 * @method addFontToolbar
 * @param {String} id 按钮的ID，唯一
 * @param {String} fontFamily 哪种字体
 * @param {String} fontName 字的名称
 * @param {Function} callback 按钮被点击后响应的事件
 */
export async function addFontToolbar(id: string, fontFamily: string, fontName: string) {
    return await execute(serviceName, 'addFontToolbar', { id: id, fontFamily: fontFamily, fontName: fontName })
}

/**
 * 删除Toolbar
 * @method deleteToolbar
 * @param {String} id 按钮的ID，唯一
 */
export function deleteToolbar(id: string) {
    execute(serviceName, 'deleteToolbar', { id: id })
}

/**
 * 禁用Toolbar
 * @method disabledToolbar
 * @param {String} id 按钮的ID，唯一
 * @param {Boolean} disabled 是否禁用
 */
export function disabledToolbar(id: string, disabled: boolean) {
    execute(serviceName, 'disabledToolbar', { id: id, disabled: disabled })
}

/**
 * 添加文本Toolbar
 * @method addTextToolbar
 * @param {String} id 按钮的ID，唯一
 * @param {String} text 按钮的文字
 * @param {Function} callback 按钮被点击后响应的事件
 */
export async function addTextToolbar(id: string, text: string) {
    return await execute(serviceName, 'addTextToolbar', { id: id, text: text })
}

/**
 * 更改文本Toolbar的文字
 * @method changeTextToolbar
 * @param {String} id 按钮的ID，唯一
 * @param {String} text 按钮的文字
 */
export function changeTextToolbar(id: string, text: string) {
    execute(serviceName, 'changeTextToolbar', { id: id, text: text })
}

/**
 * 获取请求的数据
 * @method getRequestData
 * @param {Function} callback 获取到后通知的事件
 * @param {JSON} callback.data 获取到的数据
 */
export async function getRequestData<T>() {
    const data = await execute<{ data: string }>(serviceName, 'getRequestData')
    return JSON.parse(data.data) as T
}

/**
 * 设置是否启用WebView的历史功能，可以后退WebView里面的页面
 * @method setHistroyEnabled
 * @param {Boolean} [false] enabled 是否开启
 */
export function setHistroyEnabled(enabled: boolean) {
    return execute(serviceName, 'setHistroyEnabled', { enabled: enabled })
}

/**
 * 设置是否禁用WebView的后退功能
 * @method setHistroyBackDisabled
 * @param {Boolean} [false] disabled 是否禁用
 */
export function setHistroyBackDisabled(disabled: boolean) {
    return execute(serviceName, 'setHistroyBackDisabled', { disabled: disabled })
}

export function addTextViewButton(id: string, text: string) {
    return execute(serviceName, 'addTextViewButton', { id: id, text: text })
}

export function deleteViewButton(id: string) {
    return execute(serviceName, 'deleteViewButton', { id: id })
}

/**
 * 设置当前标题栏是否可见
 * @method setTitleBarVisible
 * @param {Boolean} isVisible 是否可见
 */
export function setTitleBarVisible(isVisible: boolean) {
    return execute(serviceName, 'setTitleBarVisible', { isVisible: isVisible })
}

/**
 * 设置当前是否启用沉浸式状态栏
 * @method enabledImmersiveStatusBar
 * @param {Boolean} enabled 是否启用
 */
export function enabledImmersiveStatusBar(enabled: boolean) {
    return execute(serviceName, 'enabledImmersiveStatusBar', { enabled: enabled })
}

/**
 * 设置当前页面是否启用油滑关闭功能
 * @method enabledSwipeBack
 * @param {boolean} enabled 是否启用
 */
export function enabledSwipeBack(enabled: boolean) {
    return execute(serviceName, 'enabledSwipeBack', { enabled: enabled })
}

/**
 * 设置当前窗体最小化，仅PC可用
 * @method minimize
 */
export function minimize() {
    return execute(serviceName, 'minimize')
}
