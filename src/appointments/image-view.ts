import { execute } from '../web-bridge/native'

const serviceName = 'imageView'

/**
 * 显示图像查看器
 * @param imageList 要显示的图片列表
 * @param currentIndex 当前的图片索引
 */
export async function show(
    imageList: {
        /**
         * 图片的下载URL
         */
        url: string
        /**
         * 图片的标题
         */
        title: string
    }[],
    currentIndex: null
) {
    return await execute<any>(serviceName, 'show', { imageList: imageList, currentIndex: currentIndex })
}
