import { StartRecordAction, StopRecordAction } from '../../../appointments/audio.de'
import { ServiceBase } from './service-base'
import { fire } from './event-manage'
const gl = window as any
const Recorder = gl.Recorder

let recordInstance: any = null
function open(maxSeconds: number) {
    return new Promise<{
        error?: {
            isUserNotAllow?: boolean
            message?: string
        }
    }>((resolve, reject) => {
        if (!Recorder) {
            resolve({ error: { message: '没有Recorder库' } })
        }
        const rec = Recorder({
            type: 'mp3',
            sampleRate: 16000,
            bitRate: 16, //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
            onProcess: function () {
                //录音实时回调，大约1秒调用12次本回调
                //可利用extensions/waveview.js扩展实时绘制波形
                //可利用extensions/sonic.js扩展实时变速变调，此扩展计算量巨大，onProcess需要返回true开启异步模式
            }
        })
        rec.open(
            () => {
                recordInstance = rec
                rec.start()
                if (maxSeconds > 0) {
                    setTimeout(() => {
                        stop()
                    }, maxSeconds * 1000)
                }
                resolve({})
            },
            (msg: string, isUserNotAllow: boolean) => {
                resolve({ error: { message: msg, isUserNotAllow } })
            }
        )
    })
}

const stop = function () {
    return new Promise<{
        audioELement?: HTMLAudioElement
        duration?: number
        error?: {
            message?: string
        }
    }>(resolve => {
        if (!recordInstance) {
            resolve({ error: { message: '录音失败，没有初始化录音' } })
            return
        }
        const rec = recordInstance
        rec.stop(
            function (blob: any, duration: number) {
                console.log(blob, (window.URL || webkitURL).createObjectURL(blob), '时长:' + duration + 'ms')
                rec.close() //释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
                // rec = null
                recordInstance = null

                //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传

                /*** 【立即播放例子】 ***/
                var audio = document.createElement('audio')
                var id = new Date().getTime().toString()
                audio.controls = true
                audio.id = id
                document.body.appendChild(audio)
                //简单利用URL生成播放地址，注意不用了时需要revokeObjectURL，否则霸占内存
                audio.src = (window.URL || webkitURL).createObjectURL(blob)
                audio.style.visibility = 'hidden'
                audio.style.width = '0'
                audio.style.height = '0'
                audio.style.position = 'absolute'
                // audio.play()
                resolve({ audioELement: audio, duration: duration })
                audio.addEventListener('ended', function () {
                    //
                    fire('voicePlayEnd', { localURI: audio.id }, 'current')
                })
                fire('voiceRecordEnd', { isSuccess: true, localURI: audio.id, duration: duration }, 'current')
            },
            function (msg: string) {
                resolve({ error: { message: '录音失败:' + msg } })
                rec.close() //可以通过stop方法的第3个参数来自动调用close
                // rec = null
                recordInstance = null
                fire('voiceRecordEnd', { isSuccess: false, error: { message: '录音失败:' + msg } }, 'current')
            }
        )
    })
}

const startRecord: StartRecordAction = async function (maxSeconds) {
    //
    const { error } = await open(maxSeconds)
    if (error) {
        return { isSuccess: false, isUserNotAllow: error.isUserNotAllow, errorMessage: error.message }
    } else {
        return { isSuccess: true }
    }
}

const stopRecord: StopRecordAction = async function () {
    const { error, audioELement, duration } = await stop()
    if (error) {
        return {
            isSuccess: false,
            errorMessage: error.message || '',
            localURI: ''
        }
    }
    return {
        isSuccess: true,
        duration: duration,
        localURI: audioELement ? audioELement.id : ''
    }
}

const playVoice = async function (uri: string) {
    const audioElement = document.getElementById(uri) as HTMLAudioElement
    if (audioElement) {
        audioElement.play()
    }
    return {}
}

const pauseVoice = async function (uri: string) {
    const audioElement = document.getElementById(uri) as HTMLAudioElement
    if (audioElement) {
        audioElement.pause()
    }
    // fire('voicePlayEnd', { localURI: uri }, 'current')
    return {}
}
const stopVoice = async function (uri: string) {
    const audioElement = document.getElementById(uri) as HTMLAudioElement
    if (audioElement) {
        console.warn('浏览器不支持vocie stop方法')
    }
    // fire('voicePlayEnd', { localURI: uri }, 'current')
    return {}
}

export class AudioService extends ServiceBase {
    async startRecord({ maxSeconds }: { maxSeconds: number }) {
        const result = await startRecord(maxSeconds)
        return this.toResult(result)
    }

    async stopRecord() {
        const result = await stopRecord()
        return this.toResult(result)
    }

    async playVoice({ localURI }: { localURI: string }) {
        const result = await playVoice(localURI)
        return this.toResult(result)
    }

    async pauseVoice({ localURI }: { localURI: string }) {
        const result = await pauseVoice(localURI)
        return this.toResult(result)
    }
    async stopVoice({ localURI }: { localURI: string }) {
        const result = await stopVoice(localURI)
        return this.toResult(result)
    }
}
