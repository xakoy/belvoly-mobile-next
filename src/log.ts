const gl = window as any
export function log(message: any) {
    if (gl.__debug__belvoly === true || gl.localStorage.getItem('__debug__belvoly') === 'true') {
        console.log(message)
    }
}
