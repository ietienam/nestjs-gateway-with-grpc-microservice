/* eslint-disable prettier/prettier */
export interface VerifyCustomerEventData {
  id: string;
  email: string;
  name: string;
  verifyToken: string;
}

export enum ROLES {
  CUSTOMER = "CUSTOMER",
}
