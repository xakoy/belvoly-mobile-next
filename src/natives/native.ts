export interface Native {
    exec(service: string, action: string, callbackId: string, args?: string): void
}

export interface ActionResult {
    flag?: number
    code?: number
    message?: string
    data?: any
}
