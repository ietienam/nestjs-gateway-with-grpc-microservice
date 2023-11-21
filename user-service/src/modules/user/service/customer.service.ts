import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import {
  RegisterUserRequest,
  RegisterUserResponse,
  ServiceResponse,
} from "@ietienam/service-protos/dist/proto/users/user";
import { Customer } from "../model";
import { JwtService } from "./jwt.service";
import { responseHandler } from "../../../utils/response-handler.util";
import * as crypto from "crypto";
import { eventPublisher } from "../../../../server";
import { VerifyCustomerEventData } from "../../events/interfaces";
import { EventTypes } from "../../events/types";

const jwtService = new JwtService();

export const registerCustomer = async (
  call: ServerUnaryCall<RegisterUserRequest, RegisterUserResponse>,
  callback: sendUnaryData<ServiceResponse>
) => {
  try {
    const password = jwtService.encodePassword(call.request.password);
    const verifyTokens = generateVerifyToken();
    const payload = {
      ...call.request,
      password,
      verifyToken: verifyTokens.hashedVerifyToken,
    };

    const customer = await Customer.default.create(payload).then((data) => {
      return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        phone: data.phone,
        isVerified: data.isVerified,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });

    const data: VerifyCustomerEventData = {
      id: customer.id,
      email: customer.email,
      name: customer.firstName,
      verifyToken: verifyTokens.verifyToken,
    };

    await eventPublisher.publishEvent<VerifyCustomerEventData>(
      EventTypes.VERIFY_CUSTOMER,
      data
    );

    return callback(null, responseHandler(customer));
  } catch (error) {
    // log error
    return callback(null, responseHandler(error));
  }
};

export const generateVerifyToken = () => {
  const verifyToken = crypto.randomBytes(32).toString("hex");
  return {
    verifyToken,
    hashedVerifyToken: crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex"),
  };
};
