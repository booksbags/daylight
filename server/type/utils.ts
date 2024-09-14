type RecordWithUndefined<T extends keyof any, V> = {
    [k in T]?:V
}

export type {
    RecordWithUndefined
}