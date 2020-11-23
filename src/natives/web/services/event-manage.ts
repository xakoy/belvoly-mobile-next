const events: {
    [key: string]: boolean
} = {}

export const add = function (name: string) {
    events[name] = true
    return fire(name, null, '')!
}

export const remove = function (name: string) {
    var e = events[name]
    if (e) {
        delete events[name]
    }
}

export const fire = function (name: string, data: any, context: string) {
    var e = events[name]
    if (e) {
        return {
            eventName: name,
            data: data
        }
    }
}

export const isRegister = function (name: string) {
    var e = events[name]

    return !!e
}
