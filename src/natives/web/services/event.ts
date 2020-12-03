import { AddAction, EventContext, FireAction, RemoveAction } from '../../../appointments/event.de'
import { add as addEvent, remove as removeEvent, fire as fireEvent } from './event-manage'
import { ServiceBase } from './service-base'

const addAction: AddAction = async function (eventName) {
    return await addEvent(eventName)
}

const fireAction: FireAction = async function (eventName, data, context) {
    return fireEvent(eventName, data, context)
}

const removeAction: RemoveAction = async function (eventName) {
    removeEvent(eventName)
    return
}

export class EventService extends ServiceBase {
    async add(args: { eventName: string }) {
        return this.toResult(await addAction(args.eventName))
    }

    remove(args: { eventName: string }) {
        return this.toResult(removeAction(args.eventName))
    }

    async fire({ eventName, data, context }: { eventName: string; data: any; context: EventContext }) {
        return this.toResult(await fireAction(eventName, data, context))
    }
}
