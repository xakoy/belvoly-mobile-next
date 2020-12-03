const events: {
    [key: string]: boolean
} = {}

export const add = function (name: string) {
    return new Promise<any>(resolve => {
        events[name] = true
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
    if (e) {
        return {
            eventName: name,
            data: data
        }
    }
}
