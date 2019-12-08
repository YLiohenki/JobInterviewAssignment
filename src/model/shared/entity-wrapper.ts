export enum EntityState {
    Pristine,
    Loading,
    Success,
    Failed
}

export class EntityWrapper<T> {
    state: EntityState;
    value: T;
}
