/* eslint-disable prettier/prettier */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { USER_SERVICE_QUEUE, USER_SERVICE_EXCHANGE } from './constants';
import * as amqp from 'amqplib';
import { EventData, EventTypes } from '../types';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserServiceService implements OnModuleInit {
  private readonly logger = new Logger(UserServiceService.name);
  private channel: amqp.Channel;

  @Inject(USER_SERVICE_EXCHANGE)
  private readonly client: ClientRMQ;

  constructor(private readonly emailService: EmailService) {}

  async onModuleInit() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(USER_SERVICE_QUEUE);
    await this.processEvents();
  }

  private async processEvents() {
    this.channel.consume(USER_SERVICE_QUEUE, async (message) => {
      if (message) {
        let content: EventData<any>;
        try {

          content = JSON.parse(message.content.toString());

          switch (content.eventType) {
            case EventTypes.VERIFY_CUSTOMER:
              await this.emailService
              .sendWelcomeCustomer(content.data)
              .then(() => {
                this.channel.ack(message);
              })
              .catch((error) => {
                this.logger.error(
                  'Failed to send sendWelcomeCustomer Email',
                  error,
                );
              });
              break;
            default:
              break;
          }
        } catch (error) {
          this.logger.error('Invalid message format', error);
          this.channel.ack(message);
        }
      }
    });
  }
}
