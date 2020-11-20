export interface GetAction {
    (): Promise<{
        /**
         * 定点信息
         */
        point: {
            /**
             * 经度
             */
            longitude: number
            /**
             * 纬度
             */
            latitude: number
        }
    }>
}
