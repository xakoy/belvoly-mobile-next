const rawConsoleLog = console.log

const alertCallback = jest.fn(s => {
    // rawConsoleLog(s)
})
global.alert = alertCallback
;(global as any).__debug__belvoly = true

const consoleLogCallback = jest.fn()
console.log = consoleLogCallback

export { alertCallback, consoleLogCallback }
