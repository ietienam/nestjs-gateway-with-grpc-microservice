import { ROLES } from "../../../constants";

export interface VerifyCustomerEventData {
  id: string;
  email: string;
  name: string;
  verifyToken: string;
}
