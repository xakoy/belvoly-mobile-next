import { consoleLogCallback } from './env'

import { log } from '../src/log'

it('log', () => {
    const message = '日志消息'
    log(message)
    expect(consoleLogCallback.mock.calls[0][0]).toBe(message)
})
