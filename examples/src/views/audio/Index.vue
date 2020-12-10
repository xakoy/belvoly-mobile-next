<template>
    <page-view title="Audio" :fullHeight="true">
        <div>
            <div v-show="!isRecord">
                <p>点击下方开始按键，开始录音</p>
                <van-cell-group title="录制选项">
                    <van-cell center title="不限制时间">
                        <template #right-icon>
                            <van-switch v-model="isNoLimitTime" @change="limitTimeChangeHandler" size="24" />
                        </template>
                    </van-cell>
                    <van-field
                        v-show="!isNoLimitTime"
                        v-model="maxRecordSeconds"
                        type="digit"
                        label="最长录制时间（秒）"
                        input-align="right"
                        :formatter="maxRecordSecondsInputFormatter"
                    />
                </van-cell-group>
            </div>
            <p v-show="isRecord">{{ time }}秒</p>
            <p v-if="videoURI">
                录音完成（点击播放）：文件{{ videoURI }}，时长：{{ duration / 1000 }}秒
                <van-grid clickable column-num="3">
                    <van-grid-item v-show="!isPlaying" text="播放" icon="play-circle-o" @click="play" />
                    <van-grid-item v-show="isPlaying" text="暂停" icon="pause-circle-o" @click="pause" />
                    <van-grid-item v-show="isPlaying" text="停止" icon="stop-circle-o" @click="stopPlay" />
                </van-grid>
            </p>
        </div>
        <template #foot>
            <van-grid clickable column-num="1">
                <van-grid-item v-if="!isRecord" text="开始" icon="play-circle-o" @click="start" />
                <van-grid-item v-else text="停止" icon="stop-circle-o" @click="stop" />
                <!-- <van-grid-item text="重置" icon="replay" @click="reset" /> -->
            </van-grid>
        </template>
    </page-view>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted } from 'vue'
import { PageView } from '@/components'
import { appointment } from '@/common/bm'

function useAudio() {
    const isRecord = ref(false)
    const time = ref(0)
    const videoURI = ref('')
    const isPlaying = ref(false)
    const maxRecordSeconds = ref(0)
    const duration = ref(0)
    let interval: number

    function reset() {
        duration.value = 0
        time.value = 0
        isPlaying.value = false
        videoURI.value = ''
    }

    async function start() {
        reset()
        const { isSuccess, errorMessage } = await appointment.audio.startRecord(maxRecordSeconds.value)
        if (isSuccess) {
            isRecord.value = true
            interval = setInterval(() => {
                time.value++
            }, 1000)
        } else {
            alert(errorMessage)
        }
    }
    function stopRecord(isSuccess: boolean, localURI?: string, errorMessage?: string, durationMs?: number) {
        if (isSuccess) {
            videoURI.value = localURI as string
            duration.value = durationMs!
        } else {
            alert(errorMessage)
        }
        isRecord.value = false
        time.value = 0
        if (interval) {
            clearInterval(interval)
        }
    }
    async function stop() {
        const { localURI, isSuccess, errorMessage, duration } = await appointment.audio.stopRecord()

        stopRecord(isSuccess, localURI, errorMessage, duration)
    }

    async function play() {
        appointment.audio.playVoice(videoURI.value)
        isPlaying.value = true
    }
    async function pause() {
        appointment.audio.pauseVoice(videoURI.value)
        isPlaying.value = false
    }
    async function stopPlay() {
        appointment.audio.stopVoice(videoURI.value)
        isPlaying.value = false
    }

    const voicePlayEndHandler = function() {
        isPlaying.value = false
    }
    const voiceRecordEndHandler = function(event: {
        eventName: string
        data: { localURI?: string; isSuccess: boolean; errorMessage?: string; duration?: number }
    }) {
        stopRecord(event.data.isSuccess, event.data.localURI, event.data.errorMessage, event.data.duration)
    }

    onMounted(() => {
        appointment.document.on('voiceRecordEnd', voiceRecordEndHandler)
        appointment.document.on('voicePlayEnd', voicePlayEndHandler)
    })

    onUnmounted(() => {
        if (interval) {
            clearInterval(interval)
        }
        appointment.document.off('voicePlayEnd', voicePlayEndHandler)
        appointment.document.off('voicePlayEnd', voicePlayEndHandler)
    })

    return {
        maxRecordSeconds,
        duration,
        isPlaying,
        isRecord,
        start,
        stop,
        play,
        pause,
        stopPlay,
        time,
        videoURI
    }
}

export default defineComponent({
    components: {
        PageView
    },
    setup() {
        const record = useAudio()
        const isNoLimitTime = ref(true)

        return {
            ...record,
            isNoLimitTime
        }
    },
    methods: {
        limitTimeChangeHandler(value: boolean) {
            if (value) {
                this.maxRecordSeconds = 0
            }
        },
        maxRecordSecondsInputFormatter(value: string) {
            return parseInt(value || '0')
        }
    }
})
</script>

<style lang="less" module>
.box {
    height: 100%;
    display: flex;

    flex-direction: column;
}
</style>
