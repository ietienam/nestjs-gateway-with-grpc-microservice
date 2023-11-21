/* eslint-disable prettier/prettier */
export enum EventTypes {
  VERIFY_CUSTOMER = 'verify-customer',
  VERIFY_ORG = 'verify-organization',
  FORGOT_PASSWORD = 'forgot-password',
}

export type EventData<T> = {
  eventType: EventTypes;
  data: T;
};
