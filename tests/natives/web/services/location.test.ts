import { native } from '../../../../src/natives/web'
import { get } from '../../../../src/natives/web/services/location'

const callbackMocker = jest.fn()

;(global as any).BM = {
    webBridge: {
        callback: callbackMocker
    }
}

const geolocationCallback = jest.fn()
;(navigator as any).geolocation = {
    getCurrentPosition: function (callback: Function, errorCb: Function) {
        geolocationCallback()
            .then((data: any) => {
                callback(data)
            })
            .catch((error: any) => {
                errorCb(error)
            })
    }
}

beforeEach(() => {
    geolocationCallback.mockClear()
    callbackMocker.mockClear()
})

test('定位服务 get 方法', async () => {
    const mockValue = {
        coords: {
            longitude: 10.0,
            latitude: 20.0
        }
    }
    geolocationCallback.mockResolvedValue(mockValue)
    const data = await get()
    expect(data).toMatchObject({ point: { longitude: mockValue.coords.longitude } })
})

test('定位服务 get 方法, 定位失败', async () => {
    geolocationCallback.mockRejectedValue({})
    try {
        await get()
    } catch (e) {
        expect(e).toStrictEqual({})
    }
})

test('定位服务 get 方法, 通过bridge调用', async () => {
    const mockValue = {
        coords: {
            longitude: 10.0,
            latitude: 20.0
        }
    }
    geolocationCallback.mockResolvedValue(mockValue)
    const cid = 'cid'
    await native.exec('location', 'get', cid)
    const result = JSON.parse(callbackMocker.mock.calls[0][1]).data
    expect(result).toMatchObject({ point: { longitude: mockValue.coords.longitude } })
})
