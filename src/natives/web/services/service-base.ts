export interface ServiceBaseConstructor {
    new (): ServiceBaseType
}
export interface ServiceBaseType {
    callbackID: string
    [key: string]: any
}

export class ServiceBase implements ServiceBaseType {
    constructor() {}
    callbackID!: string

    toResult(data: any = {}, isDestroyCallback: boolean = true) {
        return {
            flag: 1,
            data: data,
            isDestroyCallback: isDestroyCallback
        }
    }
}
