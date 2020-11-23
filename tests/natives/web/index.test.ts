import { native } from '../../../src/natives/web'
import { consoleLogCallback } from '../../env'

const callbackMocker = jest.fn()

;(global as any).BM = {
    webBridge: {
        callback: callbackMocker
    }
}

beforeEach(() => {
    consoleLogCallback.mockClear()
    callbackMocker.mockClear()
})
test('未知服务', async () => {
    const cid = 'cid'
    await native.exec('unkonw-service', 'xx', cid, '')
    expect(consoleLogCallback.mock.calls[consoleLogCallback.mock.calls.length - 1]).toMatchObject([
        { flag: 0, code: 10000 }
    ])
})

test('未知方法', async () => {
    const cid = 'cid'
    await native.exec('driver', 'unkonw-action', cid, '')
    expect(consoleLogCallback.mock.calls[consoleLogCallback.mock.calls.length - 1]).toMatchObject([
        { flag: 0, code: 10001 }
    ])
})

test('正常调用', async () => {
    const cid = 'cid'
    await native.exec('driver', 'get', cid, '')
    const result = JSON.parse(callbackMocker.mock.calls[0][1])
    expect(result).toMatchObject({ flag: 1 })
})

test('参数错误', async () => {
    const cid = 'cid'
    const arg = '{flag: s}'
    await native.exec('driver', 'get', cid, arg)
    const result = JSON.parse(callbackMocker.mock.calls[0][1])
    expect(result).toMatchObject({ flag: 0 })
})
