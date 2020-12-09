import { add, remove, fire as fireEvent, SystemEventNameType, EventNameType } from './event'
import { EventContext } from './event.de'
import { back } from './webview'

interface Action {
    (data?: any): any
}

const events: Record<string, Array<Action>> = {}

function getEvent(name: string): Action[] {
    var event = events[name]

    if (event) {
        return event
    }

    events[name] = []

    return getEvent(name)
}

const sysEvents: Partial<
    {
        [key in SystemEventNameType]: Action
    }
> = {
    viewBeforeBack: function () {
        const name = 'viewBeforeBack'
        const evs = getEvent(name)
        let isCanBack = true

        evs.forEach(ev => {
            var result = ev()
            if (result === false) {
                isCanBack = false
            }
        })

        if (isCanBack) {
            back(true)
        }
    }
}

/**
 * 订阅事件
 * @method on
 * @param {string} eventName 事件的名称.
 * @param {Function} fn 该事件被触发时执行的函数
 */
export function on(eventName: EventNameType, fn: Action) {
    var ev = getEvent(eventName)
    if (typeof fn !== 'function') {
        return
    }

    const index = ev.indexOf(fn)
    if (index > -1) {
        return
    }

    if (ev.length == 0) {
        add(eventName, function (data) {
            var name = data.eventName
            var evs = getEvent(name)

            var sysEvent = sysEvents[name as SystemEventNameType]

            if (sysEvent) {
                sysEvent(data)
            } else {
                evs.forEach(ev => {
                    ev(data)
                })
            }
        })
    }

    ev.push(fn)
}

/**
 * 移除订阅事件
 * @method off
 * @param {string} eventName 事件的名称.
 * @param {Function} fn 事件之前的触发的函数
 */
export function off(eventName: EventNameType, fn: Action) {
    var ev = getEvent(eventName)

    if (typeof fn !== 'function') {
        return
    }

    const index = ev.indexOf(fn)
    if (index == -1) {
        return
    }

    ev.splice(index, 1)

    if (ev.length == 0) {
        remove(eventName)
    }
}

/**
 * 触发自定义事件
 * @method fire
 * @param {string} eventName 要触发事件的名称.
 * @param {JSON} [data] 触发事件的参数 JSONString.
 * @param {string} [context=openview] 触发事件的范围, 可选值. current = 当前view, openview = 打开的view
 */
export function fire(eventName: string, data: { [key: string]: any }, context: EventContext) {
    fireEvent(eventName, data, context)
}
