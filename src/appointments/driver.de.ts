export type Platform = 'android' | 'ios' | 'web' | 'wechat'

export interface DriverInfo {
    /**
     * 设备名称
     */
    name: string
    /**
     * 平台
     */
    platform: Platform
    /**
     * 系统版本
     */
    version: string
    /**
     * 框架版本
     */
    belvolyVersion: string
}

export interface GetAction {
    (): Promise<DriverInfo>
}
