export interface Native {
    exec(service: string, action: string, callbackId: string, args?: string): void
}

export interface ActionResult {
    flag?: number
    code?: number
    message?: string
    data?: any
}

export interface ServiceBaseConstructor {
    new (): ServiceBaseType
}
export interface ServiceBaseType {
    callbackID: string
    [key: string]: any
}

export interface ServiceFactory {
    (code: string): ServiceBaseConstructor
}
