/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { VerifyCustomerEventData } from '../interfaces';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeCustomer(data: VerifyCustomerEventData) {
    const verifyUrl = `${process.env.API_GATEWAY_URL}/api/auth/customer/${data.id}/verify?token=${data.verifyToken}`;

    await this.mailerService.sendMail({
      to: data.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Business! Confirm your Email',
      template: './auth/welcome-customer', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: data.name,
        verifyUrl,
      },
    });
  }
}
