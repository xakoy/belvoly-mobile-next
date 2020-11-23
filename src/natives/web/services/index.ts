import { ServiceBaseConstructor } from './service-base'
import { DriverService } from './driver'
import { WebViewService } from './webview'
import { LocationService } from './location'
import { EventService } from './event'

const services: {
    [key: string]: ServiceBaseConstructor
} = {
    driver: DriverService,
    webview: WebViewService,
    location: LocationService,
    event: EventService
}

export { services }
