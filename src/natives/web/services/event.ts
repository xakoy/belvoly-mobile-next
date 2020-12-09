import { AddAction, EventContext, FireAction, RemoveAction } from '../../../appointments/event.de'
import { add as addEvent, remove as removeEvent, fire as fireEvent } from './event-manage'
import { ServiceBase } from './service-base'

const fireAction: FireAction = async function (eventName, data, context) {
    return fireEvent(eventName, data, context)
}

const removeAction: RemoveAction = async function (eventName) {
    removeEvent(eventName)
    return
}

export class EventService extends ServiceBase {
    async add(args: { eventName: string }) {
        return this.toResult(await addEvent(args.eventName, this.callbackID), false)
    }

    remove(args: { eventName: string }) {
        return this.toResult(removeAction(args.eventName))
    }

    async fire({ eventName, data, context }: { eventName: string; data: any; context: EventContext }) {
        return this.toResult(await fireAction(eventName, data, context), false)
    }
}
