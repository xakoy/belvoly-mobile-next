import { execute } from '../web-bridge/native'

const serviceName = 'screen'

/**
 *  屏幕方向, 值可选。
 *	default=恢复全局配置的值；
 *	unspecified=由系统来判断显示方向.判定的策略是和设备相关的，所以不同的设备会有不同的显示方向；
 *	portrait=竖屏正方向或反方向，根据设备重力感应器自动调整；
 *	portrait-primary = 竖屏正方向；
 *	portrait-secondary = 竖屏反方向，屏幕正方向按顺时针旋转180°；
 *	landscape = 横屏正方向或反方向，根据设备重力感应器自动调整；
 *	landscape-primary =  横屏正方向，屏幕正方向按顺时针旋转90°；
 *	landscape-secondary = 横屏反方向，屏幕正方向按顺时针旋转270°；
 */
type Orientation =
    | 'default'
    | 'unspecified'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary'
    | 'landscape'
    | 'landscape-primary'
    | 'landscape-secondary'

/**
 * 设置屏幕方向
 * @method setOrientation

 * @param {boolean} [isEffectApp=false] 是否影响整个APP，false只影响当前页面
 */
export function setOrientation(orientation: Orientation, isEffectApp = false) {
    execute(serviceName, 'setOrientation', {
        orientation: orientation,
        isEffectApp: isEffectApp
    })
}
