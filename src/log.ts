const global = window as any
export function log(message: string) {
    if (global.__debug__belvoly === true) {
        console.log(message)
    }
}
