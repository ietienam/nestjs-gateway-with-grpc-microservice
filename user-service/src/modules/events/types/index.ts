export enum EventTypes {
  VERIFY_CUSTOMER = "verify-customer",
}

export type EventData<T> = {
  eventType: EventTypes;
  data: T
};
