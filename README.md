[![Build Status](https://travis-ci.org/xakoy/belvoly-mobile-next.svg?branch=master)](https://travis-ci.org/xakoy/belvoly-mobile-next)  
# Belvoly-Mobile.js

适配UBOX和UMobile JS库，让前端具备和原生App交互的功能

## 使用
安装
```
npm install belvoly-mobile
```

使用
```javascript
import { appointment } from 'belvoly-mobile'

const info = await appointment.driver.get()
```

## 在浏览器运行正常
在APP中上面代码运行正常，但是一般调试网页会在浏览器中调试，为了能兼容运行在浏览器中，需要引入web-native环境，而且是页面记载的最前面
```javascript
import 'belvoly-mobile/web-native'
```