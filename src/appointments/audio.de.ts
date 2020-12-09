export interface StopRecordAction {
    (): Promise<{
        /**
         * 是否开启成功
         */
        isSuccess: Boolean
        /**
         * 没有开启成功的原因
         */
        errorMessage?: String
        /**
         * 录音文件的物理路径
         */
        localURI?: String
    }>
}

export interface StartRecordAction {
    (): Promise<{
        /**
         * 是否开启成功
         */
        isSuccess: Boolean
        /**
         * 是否用户没有允许权限
         */
        isUserNotAllow?: Boolean
        /**
         * 没有开启成功的原因
         */
        errorMessage?: String
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
