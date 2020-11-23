import { native } from '../../../../src/natives/web'
import { consoleLogCallback, consoleWarnCallback } from '../../../env'
import { callbackResult } from '../help'

const callbackMocker = jest.fn()

;(global as any).BM = {
    webBridge: {
        callback: callbackMocker
    }
}

global.window = Object.create(window)
Object.defineProperty(window, 'location', {
    value: {
        href: 'http://example.org/'
    }
})

const backMocker = jest.fn()
global.window.history.back = backMocker

beforeEach(() => {
    consoleLogCallback.mockClear()
    consoleWarnCallback.mockClear()
    callbackMocker.mockClear()
    backMocker.mockClear()
})

test('webview open方法', async () => {
    const cid = 'cid'
    const args = { url: 'http://www.beyondbit.com' }
    await native.exec('webview', 'open', cid, JSON.stringify(args))
    const result = JSON.parse(callbackMocker.mock.calls[0][1]).data
    expect(result).toStrictEqual({})
    expect(callbackMocker).toHaveBeenCalledWith(cid, callbackResult({}), true)

    expect(window.location.href).toEqual(args.url)
})

test('webview back', async () => {
    const cid = 'cid'
    const args = { url: 'http://www.beyondbit.com' }
    await native.exec('webview', 'back', cid, JSON.stringify(args))
    expect(backMocker).toBeCalled()
})

test('webview popup', async () => {
    const cid = 'cid'
    const args = { url: 'http://www.beyondbit.com' }
    await native.exec('webview', 'popup', cid, JSON.stringify(args))
    expect(consoleWarnCallback).toBeCalled()
})
