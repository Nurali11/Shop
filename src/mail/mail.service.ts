import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            pass: 'pkft jpwd jfjw curu',
            user: 'boltaboyevnurali218@gmail.com'
        },
        tls: {
            rejectUnauthorized: false 
          }
    })

    async sendMail(to: string, subject: string, text: string) {
        try {
            await this.transporter.sendMail({
                to,
                subject,
                text,
                html: `
                <h1>Verify your email</h1>
                <h2>Your otp ${text}</h2>`
            })
            console.log('successfully sent')
        } catch (error) {
            console.log(error);
            
            return error
        }
    }
}
