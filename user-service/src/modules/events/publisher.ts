import amqp from "amqplib";
import config from "../../config";
import { QUEUE_NAME, ROUTING_KEY, USER_SERVICE_EXCHANGE } from "../../constants";
import { EventData, EventTypes } from "./types";

export class EventPublisher {
  private queueName: string;
  private routingKey: string;
  private exchangeName: string;
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;

  constructor() {
    this.queueName = QUEUE_NAME;
    this.exchangeName = USER_SERVICE_EXCHANGE;
    this.routingKey = ROUTING_KEY;
    this.connection = null;
    this.channel = null;
  }

  async connectToRabbitMQ() {
    try {
      this.connection = await amqp.connect(config.rabbitmq.url); // Replace with your RabbitMQ server URL
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(this.queueName, { durable: true });
      await this.channel.assertExchange(this.exchangeName, "fanout", {
        durable: true,
      });
      await this.channel.bindQueue(this.queueName, this.exchangeName, "");

      console.log("Connected to RabbitMQ");
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
    }
  }

  async publishEvent<T>(eventType: EventTypes, eventData: T) {
    if (this.channel) {
      try {
        const data: EventData<T> = {eventType, data: eventData};
        this.channel.publish(
          this.exchangeName,
          this.routingKey,
          Buffer.from(JSON.stringify(data)),
          { persistent: true }
        );

      } catch (error) {
        console.error("Error publishing event:", error);
      }
    }
  }

  async closeConnection() {
    if (this.connection) {
      await this.connection.close();
      console.log("RabbitMQ connection closed");
    }
  }
}
