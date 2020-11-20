import { native } from '../../../src/natives/web'

const callbackMocker = jest.fn()

;(global as any).BM = {
    webBridge: {
        callback: callbackMocker
    }
}

beforeEach(() => {
    callbackMocker.mockClear()
})
test('未知服务', async () => {
    const cid = 'cid'
    await native.exec('unkonw-service', 'xx', cid, '')
    expect(callbackMocker.mock.calls[0]).toEqual([cid, { flag: 0, code: 9999 }, true])
})

test('未知方法', async () => {
    const cid = 'cid'
    await native.exec('driver', 'unkonw-action', cid, '')
    expect(callbackMocker.mock.calls[0]).toEqual([cid, { flag: 0, code: 9999 }, true])
})

test('正常调用', async () => {
    const cid = 'cid'
    await native.exec('driver', 'get', cid, '')
    expect(callbackMocker.mock.calls[0][1]).toHaveProperty('flag', 1)
})

test('参数错误', async () => {
    const cid = 'cid'
    const arg = '{flag: s}'
    await native.exec('driver', 'get', cid, arg)
    expect(callbackMocker.mock.calls[0][1]).toHaveProperty('flag', 0)
})
