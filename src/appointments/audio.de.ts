export interface StopRecordAction {
    (): Promise<{
        /**
         * 是否开启成功
         */
        isSuccess: boolean
        /**
         * 没有开启成功的原因
         */
        errorMessage?: string
        /**
         * 录音文件的物理路径
         */
        localURI?: string
        /**
         * 录音的时长,单位（毫秒）
         */
        duration?: number
    }>
}

export interface StartRecordAction {
    (maxSeconds: number): Promise<{
        /**
         * 是否开启成功
         */
        isSuccess: boolean
        /**
         * 是否用户没有允许权限
         */
        isUserNotAllow?: boolean
        /**
         * 没有开启成功的原因
         */
        errorMessage?: string
    }>
}

export interface PlayVoiceAction {
    (localURI: string): Promise<any>
}

export interface PauseVoiceAction {
    (localURI: string): Promise<any>
}

export interface StopVoiceAction {
    (localURI: string): Promise<any>
}
