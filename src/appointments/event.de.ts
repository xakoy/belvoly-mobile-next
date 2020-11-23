type EventNameType = string

/**
 * 事件上下文
 * current = 当前view, openview = 打开的view
 */
export type EventContext = 'current' | 'openview'

export interface AddAction {
    (eventName: EventNameType): Promise<{ eventName: EventNameType; data: any }>
}

export interface RemoveAction {
    (eventName: EventNameType): Promise<any>
}

export interface FireAction {
    (eventName: string, data: { [key: string]: any }, context: EventContext): Promise<any>
}
