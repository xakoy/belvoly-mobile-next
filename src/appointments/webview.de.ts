export interface OpenAction {
    (url: string, direction?: string, isNeedProgressBar?: boolean, isNeedTitle?: boolean): Promise<unknown>
}

export interface BackAction {
    (isImmediate: boolean): void
}
