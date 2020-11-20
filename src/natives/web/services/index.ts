import * as driver from './driver'
import * as webview from './webview'
import * as location from './location'

const services: {
    [key: string]: any
} = {
    driver,
    webview,
    location
}

export { services }
