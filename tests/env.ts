const rawConsoleLog = console.log

const alertCallback = jest.fn(s => {
    // rawConsoleLog(s)
})
global.alert = alertCallback

const consoleLogCallback = jest.fn()
console.log = consoleLogCallback

export { alertCallback, consoleLogCallback }
