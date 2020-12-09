<template>
    <page-view title="Audio" :fullHeight="true">
        <div>
            <p v-show="!isRecord">点击下方开始按键，开始录音</p>
            <p v-show="isRecord">{{ time }}秒</p>
            <p v-if="videoURI">
                录音完成（点击播放）：文件{{ videoURI }}
                <van-grid clickable column-num="3">
                    <van-grid-item v-show="!isPlaying" text="开始" icon="play-circle-o" @click="play" />
                    <van-grid-item v-show="isPlaying" text="暂停" icon="pause-circle-o" @click="pause" />
                    <van-grid-item v-show="isPlaying" text="停止" icon="stop-circle-o" @click="stopPlay" />
                </van-grid>
            </p>
        </div>
        <template #foot>
            <van-grid clickable column-num="1">
                <van-grid-item v-if="!isRecord" text="开始" icon="play-circle-o" @click="start" />
                <van-grid-item v-else text="暂停" icon="pause-circle-o" @click="stop" />
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
    let interval: number

    function reset() {
        time.value = 0
        isPlaying.value = false
        videoURI.value = ''
    }

    async function start() {
        reset()
        const { isSuccess, errorMessage } = await appointment.audio.startRecord()
        if (isSuccess) {
            isRecord.value = true
            interval = setInterval(() => {
                time.value++
            }, 1000)
        } else {
            alert(errorMessage)
        }
    }

    async function stop() {
        const { localURI, isSuccess, errorMessage } = await appointment.audio.stopRecord()
        if (isSuccess) {
            videoURI.value = localURI as string
        } else {
            alert(errorMessage)
        }
        isRecord.value = false
        time.value = 0
        if (interval) {
            clearInterval(interval)
        }
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

    onMounted(() => {
        appointment.document.on('voicePlayEnd', voicePlayEndHandler)
    })

    onUnmounted(() => {
        if (interval) {
            clearInterval(interval)
        }
        appointment.document.off('voicePlayEnd', voicePlayEndHandler)
    })

    return {
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

        return {
            ...record
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
