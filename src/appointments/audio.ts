import { execute } from '../web-bridge/native'
import { PauseVoiceAction, PlayVoiceAction, StartRecordAction, StopRecordAction, StopVoiceAction } from './audio.de'
const serviceName = 'audio'

/**
 * 开始录音
 */
export const startRecord: StartRecordAction = function (maxSeconds: number = 0) {
    return execute(serviceName, 'startRecord', { maxSeconds: maxSeconds })
}
/**
 * 停止录音
 */
export const stopRecord: StopRecordAction = function () {
    return execute(serviceName, 'stopRecord')
}
/**
 * 播放语音
 * @param {string} localURI  需要播放的音频的本地 URI，由stopRecord接口获得
 */
export const playVoice: PlayVoiceAction = function (localURI: string) {
    return execute<{}>(serviceName, 'playVoice', { localURI })
}
/**
 * 暂停播放语音
 * @param {string} localURI  需要暂停播放的音频的本地 URI，由stopRecord接口获得
 */
export const pauseVoice: PauseVoiceAction = function (localURI: string) {
    return execute<{}>(serviceName, 'pauseVoice', { localURI })
}
/**
 * 停止播放语音
 * @param {string} localURI  需要停止播放的音频的本地 URI，由stopRecord接口获得
 */
export const stopVoice: StopVoiceAction = function (localURI: string) {
    return execute<{
        /**
         * 录音文件的物理路径
         */
        localURI: ''
    }>(serviceName, 'stopVoice', { localURI })
}

/**
 * 监听播放语音停止事件
 */
export interface VoicePlayEndEvent {
    (data: {
        /**
         * 音频的本地文件
         */
        localURI: string
    }): void
}
/**
 * 监听录音停止事件
 */
export interface VoiceRecordEnd {
    (data: {
        /**
         * 录音的本地文件
         */
        localURI: string
    }): void
}
