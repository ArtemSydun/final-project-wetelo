import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/database/models/users';
import { MailService } from './mail.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
