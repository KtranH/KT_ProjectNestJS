import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import mailConfig from '../config/mail.config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: false,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass,
      },
    });
  }
  private getVerificationTemplate(): handlebars.TemplateDelegate {
    const template = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>Xác thực email</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #007bff; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f8f9fa; }
              .code { background: #007bff; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; border-radius: 5px; }
              .footer { padding: 20px; text-align: center; color: #666; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>{{appName}}</h1>
              </div>
              <div class="content">
                  <h2>Xác thực email đăng ký</h2>
                  <p>Xin chào!</p>
                  <p>Cảm ơn bạn đã đăng ký tài khoản tại {{appName}}.</p>
                  <p>Mã xác thực của bạn là:</p>
                  <div class="code">{{verificationCode}}</div>
                  <p><strong>Mã này có hiệu lực trong 10 phút.</strong></p>
                  <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
              </div>
              <div class="footer">
                  <p>Trân trọng,<br>{{appName}}</p>
              </div>
          </div>
      </body>
      </html>
    `;
    return handlebars.compile(template);
  }

  private getWelcomeTemplate(): handlebars.TemplateDelegate {
    const template = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>Chào mừng</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #28a745; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f8f9fa; }
              .footer { padding: 20px; text-align: center; color: #666; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Chào mừng đến với {{appName}}!</h1>
              </div>
              <div class="content">
                  <h2>Xin chào {{username}}!</h2>
                  <p>Tài khoản của bạn đã được tạo thành công.</p>
                  <p>Bạn có thể đăng nhập ngay bây giờ để sử dụng các tính năng của ứng dụng.</p>
                  <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
              </div>
              <div class="footer">
                  <p>Trân trọng,<br>{{appName}}</p>
              </div>
          </div>
      </body>
      </html>
    `;
    return handlebars.compile(template);
  }

  async sendVerificationEmail(
    email: string,
    verificationCode: string,
  ): Promise<void> {
    try {
      const template = this.getVerificationTemplate();
      const html = template({
        email,
        verificationCode,
        appName: mailConfig.appName,
      });

      await this.transporter.sendMail({
        from: `"${mailConfig.appName}" <${mailConfig.from}>`,
        to: email,
        subject: 'Xác thực email đăng ký - Task Management',
        html,
      });

      this.logger.log(`Verification email sent to: ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send verification email to: ${email}`,
        error,
      );
      throw new Error('Không thể gửi email xác thực');
    }
  }

  async sendWelcomeEmail(email: string, username: string): Promise<void> {
    try {
      const template = this.getWelcomeTemplate();
      const html = template({
        email,
        username,
        appName: mailConfig.appName,
      });

      await this.transporter.sendMail({
        from: `"${mailConfig.appName}" <${mailConfig.from}>`,
        to: email,
        subject: 'Chào mừng bạn đến với Task Management!',
        html,
      });

      this.logger.log(`Welcome email sent to: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to: ${email}`, error);
    }
  }
}
