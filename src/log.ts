const gl = window as any
export function log(message: string) {
    if (gl.__debug__belvoly === true) {
        console.log(message)
    }
}
