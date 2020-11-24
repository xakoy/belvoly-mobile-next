import { ServiceBaseConstructor } from '../../native'
import { services as webServices } from '../../web/services'
import { DriverService } from './driver'

const services: {
    [key: string]: ServiceBaseConstructor
} = {
    ...webServices,
    driver: DriverService
}

export { services }
