import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import User from 'src/database/models/users';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendVerificationMail(admin: User, user: User): void {
    this.mailerService.sendMail({
      to: admin.email,
      from: process.env.MAIL_SENDER,
      subject: 'New user created and need verification',
      text: `New user created and need verification here is the user info: 
      ${JSON.stringify(
        { name: user.name, phone: user.phone, email: user.email },
        null,
        2,
      )}`,
    });
  }
}
