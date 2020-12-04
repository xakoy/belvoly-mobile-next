import { native } from '../../../../src/natives/web'
import { consoleLogCallback } from '../../../env'
import { callbackResult } from '../help'

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

async function add(args: any) {
    const cid = 'cid'
    await native.exec('event', 'add', cid, JSON.stringify(args))
}

test('add event', () => {
    const args = { eventName: 'ready' }
    add(args)
    // const result = JSON.parse(callbackMocker.mock.calls[0][1]).data
    // expect(result).toMatchObject({ eventName: args.eventName })
})

test('remove event', async () => {
    const cid = 'cid'
    const args = { eventName: 'ready' }
    await native.exec('event', 'remove', cid, JSON.stringify(args))
    expect(callbackMocker).toBeCalled()
})

test('fire event', async () => {
    const args1 = { eventName: 'ready' }
    add(args1)

    const cid = 'cid1'
    const args = { eventName: 'ready', data: { a: '数据' } }
    await native.exec('event', 'fire', cid, JSON.stringify(args))
    expect(callbackMocker).toHaveBeenCalledWith(cid, callbackResult(args), true)
})
