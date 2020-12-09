<template>
    <page-view title="首页" :isMain="true">
        <van-grid>
            <van-grid-item text="audio" icon="play-circle-o" :to="{ name: 'audio' }" />
        </van-grid>
    </page-view>
</template>

<script lang="ts">
import { PageView } from '@/components'
import { Options, Vue } from 'vue-class-component'

@Options({
    components: {
        PageView
    }
})
export default class Home extends Vue {}
</script>
