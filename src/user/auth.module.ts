import { Module } from '@nestjs/common';
import { UserService } from './auth.service';
import { UserController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
