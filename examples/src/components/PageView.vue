<template>
    <div
        class="pageview"
        :class="{
            pageview__fullheight: fullHeight,
            'pageview__ios-safe-bottom-no': !iosSafeBottom
        }"
    >
        <van-nav-bar
            class="pageview__title"
            :left-arrow="isVisableBackButton"
            :title="title"
            @click-left="leftClickHandler"
        ></van-nav-bar>
        <div class="pageview__body">
            <slot />
        </div>
        <div class="pageview__foot" v-if="$slots.foot">
            <slot name="foot" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: String,
        isMain: {
            type: Boolean,
            default: false
        },
        fullHeight: Boolean,
        iosSafeBottom: {
            type: Boolean,
            defautl: true
        }
    },
    setup(props) {
        return {
            isVisableBackButton: !props.isMain
        }
    },
    methods: {
        leftClickHandler() {
            this.$router.back()
        }
    }
})
</script>

<style lang="less">
.pageview {
    .bvan-nav-bar__title {
        font-size: 18px;
    }
    &__fullheight {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    &__loading {
        padding: 10px 0;
        text-align: center;
    }
    &__ios-safe-bottom-no &__body {
        padding-bottom: 0 !important;
    }
    &__body {
        flex: 1;
        padding-bottom: constant(safe-area-inset-bottom) !important;
        padding-bottom: env(safe-area-inset-bottom) !important;
    }
    &__fullheight &__body {
        height: 100% !important;
    }
    &__navigation {
        height: 45px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -8px 8px 0px rgba(0, 0, 0, 0.01);
        text-align: center;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;

        .bvan-button {
            border: none !important;
            &:not(:last-of-type) {
                margin-right: 24px;
            }
        }
    }

    &__hastitle {
        padding-top: 46px;
        > .bvan-nav-bar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1;
        }
    }
    &__title {
        .bvan-nav-bar__left .bvan-icon {
            color: #333;
            font-size: 20px;
        }
    }
    &__foot {
        padding-bottom: constant(safe-area-inset-bottom) !important;
        padding-bottom: env(safe-area-inset-bottom) !important;
    }
}
</style>
