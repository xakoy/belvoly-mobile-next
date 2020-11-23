import { native } from '../../../../src/natives/web'
import { consoleLogCallback } from '../../../env'

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

test('add event', async () => {
    const cid = 'cid'
    const args = { eventName: 'ready' }
    await native.exec('event', 'add', cid, JSON.stringify(args))
    const result = JSON.parse(callbackMocker.mock.calls[0][1]).data
    expect(result).toMatchObject({ eventName: args.eventName })
})
