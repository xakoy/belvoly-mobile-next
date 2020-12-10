<template>
    <page-view title="首页" :isMain="true">
        <van-grid>
            <van-grid-item text="audio" icon="play-circle-o" :to="{ name: routeNames.audio.main }" />
            <van-grid-item text="system" icon="orders-o" :to="{ name: routeNames.system.main }" />
        </van-grid>
    </page-view>
</template>

<script lang="ts">
import { PageView } from '@/components'
import { Options, Vue } from 'vue-class-component'
import { routeNames } from '@/router'

@Options({
    components: {
        PageView
    }
})
export default class Home extends Vue {
    routeNames = routeNames
}
</script>
