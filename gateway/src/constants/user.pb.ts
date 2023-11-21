/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Any } from "./google/protobuf/any.pb";
import { Struct } from "./google/protobuf/struct.pb";
import { Timestamp } from "./google/protobuf/timestamp.pb";

export const protobufPackage = "user";

export interface ServiceResponse {
  statusCode: number;
  message: string;
  data: { [key: string]: any } | undefined;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  token: string;
}

export interface LogoutRequest {
  userId: string;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Invitation {
  name: string;
  email: string;
  hash: string;
}

export interface InviteRequest {
  name: string;
  email: string;
  restaurantId: Any | undefined;
  orgId: string;
  role: string;
}

export interface InviteResponse {
  data: ServiceResponse | undefined;
}

export interface RegisterOrgRequest {
  hash: string;
  password: string;
}

export interface RegisterOrgResponse {
  organization: Organization | undefined;
}

export interface SetOrgPasswordRequest {
  password: string;
}

export interface SetOrgPasswordResponse {
  message: string;
}

export interface Staff {
  id: Any | undefined;
  orgId: Any | undefined;
  restaurantId: Any | undefined;
  nanme: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  isVerified: boolean;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface CreateStaffRequest {
  phone: string;
  hash: string;
  password: string;
}

export interface CreateStaffResponse {
  staff: Staff | undefined;
}

export interface SetStaffPasswordRequest {
  password: string;
}

export interface SetStaffPasswordResponse {
  message: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  isVerified: boolean;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface VerifyCustomerRequest {
  customerId: string;
  verifyToken: string;
}

export interface VerifyCustomerResponse {
  data: ServiceResponse | undefined;
}

export interface RegisterCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

export interface RegisterCustomerResponse {
  data: ServiceResponse | undefined;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: string;
}

export interface verifyInviteRequest {
  hash: string;
  role: string;
}

export interface fetchById {
  id: string;
}

export interface ForgotPasswordRequest {
  email: string;
  role: string;
}

export interface ForgotPasswordResponse {
  data: ServiceResponse | undefined;
}

export interface ResetPasswordRequest {
  resetToken: string;
  password: string;
  role: string;
}

export interface ResetPasswordResponse {
  data: ServiceResponse | undefined;
}

export interface UpdatePasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
  otp: string;
  role: string;
}

export interface UpdatePasswordResponse {
  data: ServiceResponse | undefined;
}

export const USER_PACKAGE_NAME = "user";

wrappers[".google.protobuf.Struct"] = { fromObject: Struct.wrap, toObject: Struct.unwrap } as any;

export interface UserServiceClient {
  login(request: LoginRequest): Observable<ServiceResponse>;

  logout(request: LogoutRequest): Observable<ServiceResponse>;

  inviteUser(request: InviteRequest): Observable<ServiceResponse>;

  verifyInvite(request: verifyInviteRequest): Observable<ServiceResponse>;

  registerOrganization(request: RegisterOrgRequest): Observable<ServiceResponse>;

  setOrganizationPassword(request: SetOrgPasswordRequest): Observable<ServiceResponse>;

  createStaff(request: CreateStaffRequest): Observable<ServiceResponse>;

  setStaffPassword(request: SetStaffPasswordRequest): Observable<ServiceResponse>;

  registerCustomer(request: RegisterCustomerRequest): Observable<ServiceResponse>;

  verifyCustomer(request: VerifyCustomerRequest): Observable<ServiceResponse>;

  validate(request: ValidateRequest): Observable<ServiceResponse>;

  forgotPassword(request: ForgotPasswordRequest): Observable<ServiceResponse>;

  resetPassword(request: ResetPasswordRequest): Observable<ServiceResponse>;

  updatePassword(request: UpdatePasswordRequest): Observable<ServiceResponse>;
}

export interface UserServiceController {
  login(request: LoginRequest): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  logout(request: LogoutRequest): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  inviteUser(request: InviteRequest): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  verifyInvite(request: verifyInviteRequest): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  registerOrganization(
    request: RegisterOrgRequest,
  ): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  setOrganizationPassword(
    request: SetOrgPasswordRequest,
  ): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  createStaff(request: CreateStaffRequest): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  setStaffPassword(
    request: SetStaffPasswordRequest,
  ): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  registerCustomer(
    request: RegisterCustomerRequest,
  ): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  verifyCustomer(
    request: VerifyCustomerRequest,
  ): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  validate(request: ValidateRequest): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  resetPassword(
    request: ResetPasswordRequest,
  ): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;

  updatePassword(
    request: UpdatePasswordRequest,
  ): Promise<ServiceResponse> | Observable<ServiceResponse> | ServiceResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "login",
      "logout",
      "inviteUser",
      "verifyInvite",
      "registerOrganization",
      "setOrganizationPassword",
      "createStaff",
      "setStaffPassword",
      "registerCustomer",
      "verifyCustomer",
      "validate",
      "forgotPassword",
      "resetPassword",
      "updatePassword",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
