/* eslint-disable prettier/prettier */
// android和IOS对webview暴露的接口名为_belvolyNative
var _belvolyNative = {
    /**
     * exec方法
     * @param {String} service 服务的代号
     * @param {String} action  方法名称
     * @param {String} callbackId 回调方法的id
     * @param {String} arguments action需要的参数，为json字符串
     */
    exec: function (service, action, callbackId, arguments) {

    }
};

/**
 * webview中的js对象向android和IOS对象暴露接口名为: BM.webBridge
 * @module 框架
 * @class BM
 */
var BM = {};

/**
 * webview中的js对象向android和IOS对象
 * @class webBridge
 * @namespace BM
 */
BM.webBridge = {
    /**
     * callback方法
     * @param {String} id 回调方法的id
     * @param {String} args参数，为json字符串
     * @param {Boolean} destroyCallback为是否释放该callback，不传时默认为true
     */
    callback: function (id, args, destroyCallback) {

    }
};

/**
 * 约定
 * @class appointment
 * @namespace BM
 */
var appointment = {};

/**
 * 设备
 * @class driver
 * @namespace BM.appointment
 */
appointment.driver = {
    /**
     * 获取设备信息
     * @method get 
     * @return string name ,//设备名称
     *         string platform: "",//平台 android 或 ios
     *         string  version: "",//系统版本 
     *         string  belvolyVersion: ""//框架版本
     */
    get: function () {

        return {
            /*
             * 设备名称
             * @type string
             */
            name: "",
            /*
             * 平台 android 或 ios
             * @type string 
             */
            platform: "",
            /*
             * 系统版本 
             * @type string 
             */
            version: "",
            /*
             * 框架版本
             * @type string 
             */
            belvolyVersion: ""
        };
    },
    /**
     * 获取系统指纹相关信息
     * @method getFingerprintInfo
     * @return Boolean isSupport, 
     */
    getFingerprintInfo: function () {
        return {
            /**
             * 系统是否支持指纹
             * @type Boolean
             */
            isSupport: false,
            /**
             * 系统是否设置过指纹
             * @type Boolean
             */
            isSet: false,
        }
    },
    getDeviceInfo: function() {
        return {
            /**
             * 设备识别号 经过加密
             */
            deviceID: '',
            /**
             * 设备平台
             */
            platform: '',
            /**
             * 设备系统版本
             */
            sysVersion: ''
        }
    }
};

/**
 * webview
 * @class webview
 * @namespace BM.appointment
 */
appointment.webview = {
    /**
     * 打开一个新的view
     * @method open
     * @param {String} url view中的URL地址为
     * @param {String} [] direction 打开Url的窗口的动画. 此参数暂时设置无效果
     * @param {Boolean} [true] isNeedProgressBar 是否需要显示进度条 
     * @param {Boolean} [true] isNeedTitle 是否需要标题
     */
    open: function (url, direction, isNeedProgressBar, isNeedTitle) {

    },
    /**
     * 弹出一个页
     * @method popup
     * @param {String} url 弹出的url
     * @param {String} data 传递到新URL的数据
     * @param {String} [] direction 打开Url的窗口的动画. 此参数暂时设置无效果
     * @param {Boolean} [true] isNeedProgressBar 是否需要显示进度条
     * @param {Boolean} [true] isNeedTitle 是否需要标题
     */
    popup: function (url, data, isNeedProgressBar, isNeedTitle) {

    },
    /**
     * 获取请求的数据
     * @method getRequestData
     * @returns 
     */
    getRequestData: function () {
        return {
            /**
             * data 返回的数据
             * @type object
             */
            data: null
        };
    },
    /**
     * 关闭一个页
     * @method close
     */
    close: function () {

    },
    /**
     * 页面后退
     * @method back
     * @param {boolean} [isImmediate = false] 是否立即后退，如果是，则不触发viewBeforeBack事件
     */
    back: function (isImmediate) {

    },
    /**
     * 关闭Propup
     * @method closePopup
     * @param {object} data 传递给打开Popup的方法
     */
    closePopup: function (data) {

    },

    /**
     * 设置当前窗口的按钮
     * @method setViewButton
     * @param {string} buttonCode 按钮代号    [默认三种: back => 后退 点击为后退.  home => 点击为跳到首页 . none => 去掉图标. 并且点击返回键也不能有任何响应]
     */
    setViewButton: function (buttonCode) {

    },
    /**
     * 去首页
     * @method goHome
     */
    goHome: function () {

    },
    /**
     * 去登录界面
     * @method goLoginView
     */
    goLoginView: function () {
    
    },
    /**
     * 设置是否启用WebView的历史功能，可以后退WebView里面的页面
     * @method setHistroyEnabled
     * @param {Boolean} [false] enabled 是否开启
     */
    setHistroyEnabled: function (enabled) {

    },
    /**
     * 设置是否禁用WebView的后退功能
     * @method setHistroyBackDisabled
     * @param {Boolean} [false] disabled 是否禁用
     */
    setHistroyBackDisabled: function (disabled) {

    },
    /**
     * 设置Webview 的标题
     * @method setTitle
     * @param {String} title 标题
     */
    setTitle: function (title) {

    },
    /**
     * 禁用刷新选项
     * @method disabledRefresh
     * @param {Boolean} disabled 是否禁用
     */
    disabledRefresh: function (disabled) {

    },
    /**
     * 添加字体Toolbar
     * @method addFontToolbar
     * @param {String} id 按钮的ID，唯一
     * @param {String} fontFamily 哪种字体
     * @param {String} fontName 字的名称
     */
    addFontToolbar: function (id, fontFamily, fontName) {

    },
    /**
     * 删除Toolbar
     * @method deleteToolbar
     * @param {String} id 按钮的ID，唯一
     */
    deleteToolbar: function (id) {

    },
    /**
     * 禁用Toolbar
     * @method disabledToolbar
     * @param {String} id 按钮的ID，唯一
     * @param {Boolean} disabled 是否禁用
     */
    disabledToolbar: function (id, disabled) {

    },
    /**
     * 添加文本Toolbar
     * @method addTextToolbar
     * @param {String} id 按钮的ID，唯一
     * @param {String} text 按钮的文字
     */
    addTextToolbar: function (id, text) {

    },
    /**
     * 更改文本Toolbar的文字
     * @method addTextToolbar
     * @param {String} id 按钮的ID，唯一
     * @param {String} text 按钮的文字
     */
    changeTextToolbar: function (id, text) {

    },
    /** 
     * 设置当前标题栏是否可见
     * @method setTitleBarVisible
     * @param {Boolean} isVisible 是否可见
     */
    setTitleBarVisible: function (isVisible) {

    },
    /**
     * 设置当前是否启用沉浸式状态栏
     * @method enabledImmersiveStatusBar
     * @param {Boolean} enabled 是否启用
     */
    enabledImmersiveStatusBar: function (enabled) {

    },
    /**
     * 设置当前页面是否启用油滑关闭功能
     * @method enabledSwipeBack
     * @param {boolean} enabled 是否启用
     */
    enabledSwipeBack: function (enabled) {

    }
};


/**
 * selectedView 选择视图
 */
appointment.selectView = {
    /**
     * 显示选择视图
     * @method show
     * @param {Number} totalCount 总共能选择的数量     
     * @param {String} [direction=left] 方向,可选的值有left,right 
     */
    show: function (totalCount, direction) {

    },
    /**
     * 设置总共能选择的数量，当变更数量时，当selectedCount == totalCount 的值，"全选"按钮会变成"取消全选"按钮，当selectedCount < totalCount "取消全选"按钮会变成"全选"按钮
     * @method setTotalCount
     * @param {Number} count 总数量
     */
    setTotalCount: function (count) {

    },
    /*
     * 设置已选择的数量. 当selectedCount == totalCount 的值，"全选"按钮会变成"取消全选"按钮，当selectedCount < totalCount "取消全选"按钮会变成"全选"按钮
     * @method setSelectedCount
     * @param {Number} count 数量
     */
    setSelectedCount: function (count) {

    },
    /**
     * 注册执行事件处理器，一直执行，知道遇到unRegisterEventHandler才注销事件
     * @method registerEventHandler
     */
    registerEventHandler: function () {
        return {
            /**
             * 事件名称 参考selectViewEvents的定义
             * @type String
             */
            name: "",
            /**
              * 事件的数据 参考selectViewEvents的定义 
              * @type JSON
              */
            data: null
        }

    },
    /**
     * 注销执行事件的处理器
     * @method unRegisterEventHandler
     */
    unRegisterEventHandler: function () {

    },
    /**
     * 关闭选择视图
     * @method close
     * @param {String} code 关闭的动作，两个值ok=确认关闭,cancel=取消关闭
     * @param {String} data 关闭的数据
     */
    close: function (code, data) {

    }
}

/**
 * selectViewEvents 选择视图的事件定义
 */
appointment.selectViewEvents = {
    /**
     * 视图已经准备好了的事件. 视图在标题切换好的时候触发
     */
    ready: function () {

    },
    /**
     * 点击全选按钮后触发的事件
     */
    allSelected: function () {

    },
    /**
     * 点击取消权限按钮后触发的事件
     */
    allUnselected: function () {

    },
    /**
     * 视图关闭的事件，视图在退出标题切换完成后的时候触发
     * @event closed
     * @param {String} code 关闭的动作 两个值ok=确认关闭,cancel=取消关闭
     * @param {String} data 关闭的数据，调用close方法传递过来的数据
     */
    closed: function (code, data) {

    }
}

appointment.searchView = {
    /**
     * 显示
     * @method show
     * @param {String} placeholder 搜索框没有值显示的文不能
     * @param {String} defaultValue 第一次文本框显示的默认值
     */
    show: function(placeholder, defaultValue) {

    },
    /**
     * 注册执行事件处理器，一直执行，知道遇到unRegisterEventHandler才注销事件
     * @method registerEventHandler
     */
    registerEventHandler: function () {
        return {
            /**
             * 事件名称 参考selectViewEvents的定义
             * @type String
             */
            name: "",
            /**
              * 事件的数据 参考selectViewEvents的定义 
              * @type JSON
              */
            data: null
        }

    },
    /**
     * 注销执行事件的处理器
     * @method unRegisterEventHandler
     */
    unRegisterEventHandler: function () {

    },
    /**
     * 关闭选择视图
     * @method close
     * @param {String} code 关闭的动作，两个值ok=确认关闭,cancel=取消关闭
     * @param {String} data 关闭的数据
     */
    close: function (code, data) {

    }
}

/**
 * searchViewEvents 搜索视图的事件定义
 */
appointment.searchViewEvents = {
    /**
     * 视图已经准备好了的事件. 视图在标题切换好的时候触发
     */
    ready: function () {

    },
    /**
     * 搜索框文本改变后触发的事件
     * @event change
     * @param {String} value 文本框的值
     */
    change: function (value) {

    },
    /**
     * 视图关闭的事件，视图在退出标题切换完成后的时候触发
     * @event closed
     * @param {String} code 关闭的动作 两个值ok=确认关闭,cancel=取消关闭
     * @param {String} data 关闭的数据，调用close方法传递过来的数据
     */
    closed: function (code, data) {

    }
}

/**
 * imageView 图片查看器
 * @class imageView
 * @namespace BM.appointment
 */
appointment.imageView = {
    /**
     * 显示
     * @method show
     * @param {Array} images 要显示的图片列表
     * @param {String} images.url 图片的下载URL
     * @param {String} images.title 图片的标题
     * @param {int} currentIndex 当前的图片索引
     */
    show: function (imageList, currentIndex) {

    }
}


/**
 * 地理位置
 * @class location
 * @namespace BM.appointment 
 */
appointment.location = {
    /**
     * 获取定位
     * @method get
     * @return { 
     *    point: { 
     *          longitude: 100.00, 
     *          latitude: 100.00
     *       }
     *   }
     */
    get: function () {
        return {
            /*
             * 定点信息
             */
            point: {
                /*
                 * 经度
                 */
                longitude: 100.00,
                /*
                 * 纬度
                 */
                latitude: 100.00
            }
        };
    }
};

/**
 * 音频
 */
appointment.audio = {
    /**
     * 开始录音
     * @param {number}} maxSeconds 最长录制多长时间，单位秒，如果为0,则不限制时间，直到手动停止或其它情况停止
     */
    startRecord: function(maxSeconds) {
        return {
            /**
             * 是否开启成功
             */
            isSuccess: true,
            /**
             * 是否用户没有允许权限
             */
            isUserNotAllow?: false,
            /**
             * 没有开启成功的原因
             */
            errorMessage: ''
        }
    },
    /**
     * 停止录音
     */
    stopRecord: function() {
        return {
            /**
             * 是否录音成功
             */
            isSuccess: Boolean,
            /**
             * 没有停止成功的原因
             */
            errorMessage?: String,
            /**
             * 录音文件的物理路径
             */
            localURI?: String,
            /**
             * 录音的时长,单位（毫秒）
             */
            duration?: Number
        }
    },
    /**
     * 播放语音
     * @param {string} localURI  需要播放的音频的本地 URI，由stopRecord接口获得
     */
    playVoice: function(localURI) {

    },
    /**
     * 暂停播放语音
     * @param {string} localURI  需要暂停播放的音频的本地 URI，由stopRecord接口获得
     */
    pauseVoice: function(localURI) {

    },
    /**
     * 停止播放语音
     * @param {string} localURI  需要停止播放的音频的本地 URI，由stopRecord接口获得
     */
    stopVoice: function(localURI) {

    },
}


/**
 * 系统
 * @class system 
 * @namespace BM.appointment
 */
appointment.system = {
    /**
     * 登录
     * @method signOn
     * @param {String} account 用户名
     * @param {string} data 附件数据
     */
    signOn: function (account, data) {
        return {};
    },
    /**
     * 注销
     * @method signOut
     * @param {Boolean} isClearData 是否清除用户数据
     */
    signOut: function (isClearData) {
        return {};
    },
    /**
     * 登录
     * @method signOn
     * @param {String} account 用户名
     * @param {string} data 附件数据
     * @param {String} keepStateData 保持登录状态的数据
     */
    login: function (account, data, keepStateData) {
        return {};
    },
    /**
     * 注销
     * @method signOut
     * @param {Boolean} isClearData 是否清除用户数据
     */
    logout: function (isClearData) {
        return {};
    },
    /**
     * 获取当前用户
     * return {JSON} 
     */
    getUser: function () {
        return {
            account: "luolong",
            data: null
        }
    },
    /**
     * 是否启用启动锁
     * @method enabledStartupLock
     * @param {boolean} enabled 
     * @param {int} timeout 超时时间（单位为秒）
     * @return 操作结果
     */
    enabledStartupLock: function (enabled, timeout) {
        return {
            /**
             * 操作是否成功
             */
            isSuccess: true
        }
    },
    /**
     * 获取启动锁
     * @method getStartuplock
     * @returns 
     */
    getStartuplock: function () {
        return {
            /**
             * 是否启用
             */
            enabled: true,
            /**
             * 超时时间
             */
            timeout: 300000
        }
    },
    /**
     * 使用外部浏览器，打开一个Url
     * @method openUrl
     * @param {string} url 要打开的url地址
     */
    openUrl: function (url) {

    },
    /**
     * 退出应用，回到桌面
     * @method quit
     */
    quit: function () {

    },

    /**
     * 提示信息
     * @method toast
     * @param {string} text 提示的文本
     * @param {int} displayTime 显示的时间（单位毫秒）
     */
    toast: function (text, displayTime) {

    },
    /**
     * 设置系统角标的数字，根据不同的系统，不同展示。目前只支持华为和苹果，其它系统的调用此方法没有任何效果
     * @param {int} number 角标数字，如果为0，则角标消失
     */
    setBadge(number) {

    }
};

/**
 * 图片上传
 * @class camera
 * @namespace BM.appointment
 */
appointment.camera = {
    /**
     * 获取图片
     * @method getPicture
     * @param {number} [compressionRatio=1] 压缩比例，默认为1 。 如0.75 = 75%
     * @return { imgURI:"" }
     */
    getPicture: function (compressionRatio) {
        return {
            /**
             * 成功后的图片地址 
             */
            imgURI: "",
            /**
             * 压缩的比例
             */
            compressionRatio: 1,
            /**
             * 所选择的文件字节大小
             */
            fileSize: 0
        };
    },
    /**
     * 上传图片
     * @method uploadPicture
     * @param {String} imgURI 图片路径
     * @param {String} uploadURL 上传服务器地址
     * @param {number} [compressionRatio=1] 压缩比例，默认为1 。 如0.75 = 75%
     * @return int state,//状态 0 准备, 1 上传中, 2 成功, 3 失败， 4 超时
     *         double progressPercentage 上传进度 1为100%
     *         string code 表示
     *         string message 返回文本
     *         string result 服务端返回的数据
     */
    uploadPicture: function (imgURI, uploadURL, compressionRatio) {
        return {
            /*
             * 状态
             */
            state: 0, // 0 准备, 1 上传中, 2 成功, 3 失败， 4 超时
            progressPercentage: 0.90, // 上传进度 1为100%,    
            code: "0", // 表示
            message: "返回文本",
            result: "服务端返回的数据"
        };
    },
    /**
     * 扫码
     * @method scanQR
     * @return {JSON} result 返回的文本结果
     */
    scanQR: function () {
        return {
            /**
             * 操作是否成功
             */
            isSuccess: true,
            /**
             * 返回的结果
             */
            context: ""
        };
    }
};

/**
 * 文件操作
 * @class file
 * @namespace BM.appointment
 * @exception 异常代码5开头
 */
appointment.file = {
    /**
     * 获取文件
     * @method getFiles
     * @param {int} maxTotal 可以选择的最大数量（0为不限制）
     * @returns Array
     */
    getFiles: function (maxTotal) {
        return [{
            /**
             * 成功后的文件地址 
             */
            fileURI: "",
            /**
             * 所选择的文件字节大小
             */
            fileSize: 0
        },
        {
            /**
             * 成功后的文件地址 
             */
            fileURI: "",
            /**
             * 所选择的文件字节大小
             */
            fileSize: 0
        }]
    },
    /**
     * 上传文件
     * @method uploadFile
     * @param {String} fileURI 图片路径
     * @param {String} uploadURL 上传服务器地址
     * @return int state,//状态 0 准备, 1 上传中, 2 成功, 3 失败， 4 超时 , 6 文件在本地缓存已存在
     *         double progressPercentage 上传进度 1为100%
     *         string code 表示
     *         string message 返回文本
     *         string result 服务端返回的数据
     */
    uploadFile: function (fileURI, uploadURL) {

    },
    /**
     * 获取本地图片文件内容
     * @method getLocalImgData
     * @param {string} imgURI 本地图片URI
     * @exception 如果imgURI不是一个图片文件，则返回异常代码501
     */
    getLocalImgData: function (imgURI) {
        return {
            /**
             * 本地图片URI
             */
            uri: imgURI,
            /**
             * 图片的大小
             */
            size: 0,
            /**
             * 图片的名称
             */
            name: "图片1.jpg",
            /**
             * 图片的base64格式，而直接放到img src属性中
             */
            baseData: null
        }
    },
    /**
     * 下载文件
     * 将文件下载到当前用户的指定目录中
     * @method download
     * @param {String} downloadURL 文件下载地址
     * @param {String} fileName 文件名（包含扩展名）
     * @param {String} categoryCode 文件的分类Code
     * @param {Object} extendData 文件关联的扩展数据（特殊需求使用）
     * @param {String} id 文件的ID
     * @param {Boolean} [isFinishedOpen=true] 下载完成后，是否打开文件
     * @return int state,//状态 0 准备, 1 下载中, 2 成功, 3 失败， 4 超时
     *         double progressPercentage 上传进度 1为100%
     *         string code 表示
     *         string message 返回文本
     *         string result 服务端返回的数据
     */
    download: function (downloadURL, fileName, categoryCode, extendData, id, isFinishedOpen) {

    },
    /**
     * 查询文件是否存在
     * @method exists
     * @param {String} id 文件的ID
     * @param {Function} callback 查询后的回调函数
     * @param {Function} callback.result 查询的结果 
     * @param {Function} callback.result. 查询的结果  
     */
    exists: function (id) {
        /**
         * 返回结果，是否成功
         * @type Boolean
         */
        return true;
    },
    /**
     * 根据文件ID打开文件
     * @method open
     * @param {String} id 文件的ID
     */
    open: function (id) {

    },
    /**
     * 获取本地文件列表
     * @method query
     */
    query: function (categoryCode) {
        return [{
            /**
             * 文件分类Code
             */
            categoryCode: "",
            /**
             * 文件列表
             */
            files: [{
                /**
                 * 文件id
                 */
                id: "",
                /**
                 * 文件名
                 */
                name: "",
                /**
                 * 文件大小
                 */
                size: "",
                /**
                 * 下载地址
                 */
                downloadURL: "",
                /**
                 * 本地文件路径
                 */
                localPath: "",
                /**
                 * 文件关联的扩展数据
                 */
                extendData: {},
                /**
                 * 文件下载时间
                 */
                downloadDate: new Date()
            }]
        }]
    },
    /**
     * 打开本地文件
     * @method show
     * @param {String} localPath 文件本地路径
     */
    show: function (localPath) {

    },
    /**
     * 删除本地文件
     * @method remove
     * @param {String} id 文件id
     */
    remove: function (id) {

    }
}

/**
 * 联系人服务
 * @class contacts
 * @namespace BM.appointment
 */
appointment.contacts = {
    
    /**
     * 添加联系人
     * @method add
     * @param {String} [type=phone] 通讯录类型 phone=手机通讯录，sim=sim卡通讯录
     * @param {contact} contact 通讯录对象
     */
    add: function (type, contact) {
        return {
            /**
             * 添加成功后的联系人id
             */
            id: null
        }
    }
};

/**
 * 联系人
 * @class contact
 * @namespace BM.appointment
 */
appointment.contacts.contact = {
    /**
     * id 联系人在手机的唯一标识
     * @property id
     * @type String
     * @readonly
     */
    id: null,
    /**
     * 联系人显示的名字
     * @property displayName
     * @type String
     */
    displayName: null,
    /**
     * 名称
     * @property name
     * @type ContactName
     */
    name: null,
    /**
     * 昵称
     * @property nickname
     * @type String
     */
    nickname: null,
    /**
     * 联系人电话，数组
     * @property phoneNumbers
     * @type Array[ContactField]
     */
    phoneNumbers: [],
    /**
      * 联系人邮箱，数组
      * @property phoneNumbers
      * @type Array[ContactField]
      */
    emails: [],
    /**
     * 生日 yyyy-MM-dd
     * @property birthday
     * @type string
     */
    birthday: null,
    /**
     * 联系人所属组织，数组
     * @property organizations
     * @type Array[ContactOrganization]
     */
    organizations: []
}

/**
 * 联系人域数据对象，保存联系人特定域信息
 * @class contactField
 * @namespace BM.appointment
 */
appointment.contacts.contactField = {
    /**
     * 联系人域类型，如电话号码中的“mobile”、“home”、“company”
     * @property type
     * @type String
     */
    type: null,
    /**
     * 联系人域值
     * @property value
     * @type String
     */
    value: null,
    /**
     * 是否为首选项
     * @property preferred
     * @type Boolean
     * @default false
     */
    preferred: false
}

/**
 * 联系人所属组织信息
 * @class contactOrganization
 * @namespace BM.appointment
 */
appointment.contacts.contactOrganization = {
    /**
     * 联系人所属组织类型，如"company"
     * @property type
     * @type String
     */
    type: null,
    /**
     * 联系人所属组织名称
     * @property name
     * @type String
     */
    name: null,
    /**
     * 联系人所属组织部门
     * @property department
     * @type String
     */
    department: false,
    /**
     * 联系人在组织中的职位
     * @property title
     * @type String
     */
    title: null,
    /**
      * 是否为首选项
      * @property preferred
      * @type Boolean
      * @default false
      */
    preferred: false
}

appointment

/**
 * 插件服务
 * @class plugin
 * @namespace BM.appointment
 */
appointment.plugin = {
    /**
     * 显示插件
     * @method show
     * @param {string} code 插件的标识
     * @param {string} functionCode  功能的标识
     * @param {string} params 传递的参数(JsonString)
     */
    show: function (code, functionCode, params) {

    }
};

/**
 * 社交服务
 * @class sns
 * @namespace BM.appointment
 */
appointment.sns = {
    /**
     * 分享
     * @method share
     * @param {string} title 标题 为null是获取当期网页的标题
     * @param {string} subtitle 二级标题
     * @param {string} description 简介
     * @param {string} imgUrl 图片URL
     * @param {boolean} isScreenshot 是否屏幕截图
     * @param {string} url 分享的Url如果是为空，则默认为当前的url地址
     */
    share: function (title, subtitle, description, imgUrl, isScreenShot, url) {

    }
};

/**
 * 数据服务
 * @class data
 */
appointment.data = {
    /**
     * 设置数据
     * @method set
     * @param {string} domain 域，不同的域存储的数据不冲突
     * @param {string} key 存储的数据名
     * @param {string} value 
     */
    set: function (domain, key, value) {

    },
    /**
     * 获取数据
     * @method get
     * @param {string} domain 域，不同的域存储的数据不冲突
     * @param {string} key 存储的数据名
     * @returns {string} 返回存储的数据，如果 key 不存在。返回空
     */
    get: function (domain, key) {
        return value;
    },
    /**
     * 移除数据
     * @method remove
     * @param {string} domain 域，不同的域存储的数据不冲突
     * @param {string} key 存储的数据名
     */
    remove: function (domain, key) {

    },
    /**
     * 清空所有数据
     * @method clear
     * @param {string} domain 域，不同的域存储的数据不冲突
     */
    clear: function (domain) {

    },
    /**
     * 是否包含Key
     * @param {string} domain 域，不同的域存储的数据不冲突
     * @returns {boolean} true/false
     */
    containKey: function (domain, key) {
        return true;
    }
}

/**
 * 屏幕服务
 */
appointment.screen = {
	/**
	 * 设置屏幕方向
	 * @method setOrientation
	 * @param {string} orientation 屏幕方向, 值可选。
	 *							    default=恢复全局配置的值；
	 *							    unspecified=由系统来判断显示方向.判定的策略是和设备相关的，所以不同的设备会有不同的显示方向；
	 *							    portrait=竖屏正方向或反方向，根据设备重力感应器自动调整；
	 *								portrait-primary = 竖屏正方向；
	 *								portrait-secondary = 竖屏反方向，屏幕正方向按顺时针旋转180°；
	 *								landscape = 横屏正方向或反方向，根据设备重力感应器自动调整；
	 *								landscape-primary =  横屏正方向，屏幕正方向按顺时针旋转90°；
	 *								landscape-secondary = 横屏反方向，屏幕正方向按顺时针旋转270°；
	 * @param {boolean} [isEffectApp=false] 是否影响整个APP，false只影响当前页面 
	 */
    setOrientation: function (orientation, isEffectApp) {

    }
};

appointment.event = {
    /**
     * 订阅事件
     */
    add: function (eventName) {
        return {
            /**
             * 事件名称
             * @type String
             */
            eventName: eventName,
            /**
             * 事件的数据 参考Events的定义 
             * @type JSON
             */
            data: {}
        }
    },
    /**
     * 注销订阅事件
     */
    remove: function (eventName) {

    },
    /**
     * 触发自定义事件
     * @method fire
     * @param {string} eventName 要触发事件的名称.
     * @param {string} data 触发事件的参数 JSONString.
     * @param {string} [context=openview] 触发事件的范围, 可选值. current = 当前view, openview = 打开的view
     */
    fire: function (eventName, data, context) {

    }
}

appointment.events = {
    /**
     * 点击后退键响应的事件
     */
    backbutton: function () {

    },
    /**
     * 页面显示的时候触发
     * @event viewload
     * @param {string} pattern 加载的模式.firstTime = 第一次代开页面; back 后退回来的; closePopup 关闭PopupView回来的; unknown 其它方式
     */
    viewload: function(pattern) {

    },
    /**
     * 页面后退前的时候触发
     * @event viewBeforeBack
     */
    viewBeforeBack: function () {

    },
    /**
     * 键盘弹出时触发
     * @event keyboardShow
     */
    keyboardShow: function(){

    },
    /**
     * 键盘关闭时触发
     * @event keyboardShow
     */
    KeyboardHide: function(){

    },
    /**
     * 监听录音停止事件
     * @param {boolean} 是否录音成功
     * @param {string} 录音的本地文件URI
     * @param {string} 录音的时长，单位毫秒
     * @param {string} 没有录制成功的原因
     */
    voiceRecordEnd: function(isSuccess, localURI,duration, errorMessage,) {
        
    },
    /**
     * 监听播放音频停止事件
     * @param {string} 音频本地文件URI
     */
    voicePlayEnd: function(localURI) {

    }
}

/**
 * 客户端响应格式
 * @class response
 */
var response = {
    /**
     * 标志 当0表示为失败，其它值为成功
     * @property flag
     * @type int
     * @default 1
     */
    flag: 1,
    /**
     * 文本信息
     * @property message
     * @type string
     * @default ""
     */
    message: "信息",
    /**
     * 结果编码， 在错误的时候使用的到
     * @property code
     * @type string
     * @default ""
     */
    code: "结果code",
    /**
     * 返回的数据 
     * @property data
     * @type object
     * @default {}
     */
    data: {}
};
