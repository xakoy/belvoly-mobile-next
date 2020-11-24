import { services as webServices } from '../../web/services'
import { DriverService } from './driver'

const services = {
    ...webServices,
    driver: DriverService
}

export { services }
