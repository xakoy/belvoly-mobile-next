import { execute } from '../web-bridge/native'
import { AddAction, EventContext, RemoveAction, FireAction } from './event.de'

const serviceName = 'event'

const SYSTEM_EVENTS = {
    /**
     * 点击后退键响应的事件
     */
    backbutton() {},
    /**
     * 页面显示的时候触发
     * @param pattern 加载的模式.firstTime = 第一次代开页面; back 后退回来的; closePopup 关闭PopupView回来的; unknown 其它方式
     */
    viewload(pattern: 'firstTime' | 'back' | 'closePopup' | 'unknown') {},
    /**
     * 页面后退前的时候触发
     */
    viewBeforeBack() {},
    /**
     * 键盘弹出时触发
     */
    keyboardShow() {},
    /**å
     * 键盘关闭时触发
     */
    KeyboardHide() {}
}

export type SystemEventNameType = keyof typeof SYSTEM_EVENTS

export type EventNameType = SystemEventNameType | string

/**
 * 订阅事件
 * @param eventName 事件名称
 */
export const add = function (
    eventName: EventNameType,
    action: (data: { eventName: EventNameType; data: any }) => void
) {
    execute(serviceName, 'add', { eventName: eventName }, action)
}

/**
 * 注销订阅事件
 * @param eventName 事件名称
 */
export const remove: RemoveAction = function (eventName: EventNameType) {
    return execute(serviceName, 'remove', { eventName: eventName })
}

/**
 * 触发自定义事件
 * @method fire
 * @param {string} eventName 要触发事件的名称.
 * @param {JSON} [data] 触发事件的参数 JSONString.
 * @param {string} [context=openview] 触发事件的范围, 可选值. current = 当前view, openview = 打开的view
 */
export const fire: FireAction = function (
    eventName: string,
    data: { [key: string]: any },
    context: EventContext = 'openview'
) {
    var dataString = data ? JSON.stringify(data) : ''
    context = context || 'openview'

    return execute(serviceName, 'fire', { eventName: eventName, data: dataString, context: context })
}
