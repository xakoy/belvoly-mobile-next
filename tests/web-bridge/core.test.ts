import { alertCallback, consoleLogCallback } from '../env'

import { Arg, callback, registerCallback } from '../../src/web-bridge/core'

afterEach(() => {
    alertCallback.mockClear()
    consoleLogCallback.mockClear()
})

describe('registerCallback', () => {
    test('callback is null', () => {
        const id = registerCallback()
        expect(id).toBe(undefined)
    })

    test('正常注册', () => {
        const fn = jest.fn()
        const id = registerCallback(fn)
        expect(!!id).toBe(true)
    })
})

describe('callback', () => {
    test('args not JSON INPUT', () => {
        callback('id-1', '')
        const error = alertCallback.mock.calls[0][0]
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('Unexpected end of JSON input')
    })

    describe('callback error', () => {
        test('args is error', () => {
            const arg = { flag: 0, code: 0, message: '自定义消息内容' }
            callback('id-2', arg)
            const error = alertCallback.mock.calls[0][0]
            expect(error).toBe(arg.message)
        })

        test('自定义错误消息内容', () => {
            const arg2 = { flag: 0, message: '错误内容' }
            callback('id-2-2', arg2)
            const error2 = alertCallback.mock.calls[0][0]
            expect(error2).toBe(arg2.message)
        })

        test('系统错误消息内容', () => {
            const arg = { flag: 0, code: 1 }
            callback('id-2-3', arg)
            const error2 = alertCallback.mock.calls[0][0]
            expect(error2).toBe('系统异常')
        })

        test('无错误消息内容', () => {
            const arg = { flag: 0 }
            callback('id-2-4', arg)
            expect(alertCallback.mock.calls.length).toBe(0)
        })
    })

    test('callback不存在', () => {
        const arg: Arg<any> = { flag: 1, data: {} }
        callback('id-3', arg)
        const log: string = consoleLogCallback.mock.calls[2][0]
        expect(log.startsWith('回调函数不存在')).toBe(true)
    })

    test('正常返回数据', done => {
        const arg = { flag: 1, data: { a: 1 } }
        const id = registerCallback((data: any) => {
            try {
                expect(data).toBe(arg.data)
                done()
            } catch (error) {
                done(error)
            }
        })
        callback(id!, arg)
        // two
        callback(id!, arg)
        const logLaster: string = consoleLogCallback.mock.calls[consoleLogCallback.mock.calls.length - 1][0]
        expect(logLaster.startsWith('回调函数不存在')).toBe(true)
    })

    test('回调函数可以调用多次', done => {
        const arg = { flag: 1, data: { a: 1 } }
        const countFn = jest.fn()
        const id = registerCallback((data: any) => {
            try {
                countFn()
                expect(data).toBe(arg.data)
                done()
            } catch (error) {
                done(error)
            }
        })
        callback(id!, arg, false)
        // two
        callback(id!, arg)
        // threw
        callback(id!, arg)
        expect(countFn.mock.calls.length).toBe(2)
        const logLaster: string = consoleLogCallback.mock.calls[consoleLogCallback.mock.calls.length - 1][0]
        expect(logLaster.startsWith('回调函数不存在')).toBe(true)
    })

    test('回调ID 为空', () => {
        callback('', { flag: 1 })
        expect(consoleLogCallback.mock.calls.length).toBe(1)
    })
})
