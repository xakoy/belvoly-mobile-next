import { ServiceBaseConstructor } from '../../native'
import { DriverService } from './driver'
import { WebViewService } from './webview'
import { LocationService } from './location'
import { EventService } from './event'
import { AudioService } from './audio'

const services: {
    [key: string]: ServiceBaseConstructor
} = {
    driver: DriverService,
    webview: WebViewService,
    location: LocationService,
    event: EventService,
    audio: AudioService
}

export { services }
