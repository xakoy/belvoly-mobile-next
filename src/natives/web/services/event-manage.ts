import { execCore } from '../../common'

const events: {
    [key: string]: string[]
} = {}

export const add = function (name: string, callbackID: string) {
    return new Promise<any>(resolve => {
        let ev = events[name]
        if (!ev) {
            ev = events[name] = []
        }
        events[name].push(callbackID)
    })
}

export const remove = function (name: string) {
    var e = events[name]
    if (e) {
        delete events[name]
    }
}

export const fire = function (name: string, data: any, context: string) {
    var e = events[name]
    if (e && e.length > 0) {
        e.forEach(item => {
            execCore(item, {
                result: {
                    flag: 1,
                    data: {
                        eventName: name,
                        data: data
                    }
                },
                isDestroyCallback: false
            })
        })
    }
}
