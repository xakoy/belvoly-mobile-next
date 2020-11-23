const rawConsoleLog = console.log

const alertCallback = jest.fn(s => {
    // rawConsoleLog(s)
})
global.alert = alertCallback
;(global as any).__debug__belvoly = true

const consoleLogCallback = jest.fn()
const consoleWarnCallback = jest.fn()
console.log = consoleLogCallback
console.warn = consoleWarnCallback

export { alertCallback, consoleLogCallback, consoleWarnCallback }
