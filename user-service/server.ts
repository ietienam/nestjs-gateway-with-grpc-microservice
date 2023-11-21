import { Server, ServerCredentials } from "@grpc/grpc-js";
import config from "./src/config";
import * as userService from "./src/modules/user/service";
import mongoose from "mongoose";
import { UserServiceService } from "@ietienam/service-protos/dist/proto/users/user";
import { EventPublisher } from "./src/modules/events/publisher";

export const eventPublisher = new EventPublisher();

async function start() {
  try {
    await mongoose
      .connect(config.mongoose.url)
      .then(async () => {
        await eventPublisher.connectToRabbitMQ();
      })
      .then(() => {
        const server = new Server();
        server.addService(UserServiceService, { ...userService });

        server.bindAsync(
          `0.0.0.0:${config.port}`,
          ServerCredentials.createInsecure(),
          (error, port) => {
            if (error) throw error;
            console.log(`gRPC server running on port ${port}`);
            server.start();
          }
        );
      });
  } catch (error) {
    console.error(error);
  }
}

start();
