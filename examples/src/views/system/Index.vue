<template>
    <page-view title="System 服务" :fullHeight="true">
        <template #foot>
            <div style="padding: 10px">
                <van-button @click="logoutHandler" round block type="danger">退出</van-button>
            </div>
        </template>
    </page-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageView } from '@/components'
import { appointment } from '@/common/bm'

export default defineComponent({
    components: {
        PageView
    },
    methods: {
        logoutHandler() {
            appointment.system.logout(true)
        }
    }
})
</script>
