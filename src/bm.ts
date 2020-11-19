const global = window as any
// 兼容iOS WKWebView
try {
    if (global.webkit.messageHandlers && global.webkit.messageHandlers._belvolyNative) {
        global._belvolyNative = {
            exec: function (service: string, action: string, callbackId: string, args: any) {
                global.webkit.messageHandlers._belvolyNative.postMessage({
                    functionName: 'exec',
                    service: service,
                    action: action,
                    callbackId: callbackId,
                    arguments: args
                })
            }
        }
    }
} catch (e) {
    console.log('not in WKWebView')
}

// 兼容CefSharp
try {
    if (global.cef) {
        global._belvolyNative = {
            exec: function (service: string, action: string, callbackId: string, args: any) {
                global.cef.execute(service, action, callbackId, args)
            }
        }
    }
} catch (e) {
    console.log('not in WPF ChromiumWebBrowser')
}

import { webBridge } from './web-bridge'

export const BM = (global.BM = global.BM || {})

BM.webBridge = webBridge
